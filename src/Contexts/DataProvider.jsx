import React, { Component, createContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Creating a context for data sharing across components
const DataContext = createContext();

// Custom hook for easy access to the DataContext
export const useData = () => React.useContext(DataContext);

// Function to normalize user data by modifying score property
const normalizeUserData = (userData) => {
  if (userData.hasOwnProperty('score')) {
    userData.todayScore = userData.score;
    delete userData.score;
  }
  return userData;
};

// Base class component handling data fetching and state
class DataProviderBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}, // Holds fetched data
      useApi: true, // Toggle between API and local data
      userId: null, // Current user ID
    };
  }

  // Fetch data after the component mounts
  componentDidMount() {
    this.fetchDataIfNeeded();
  }

  // Re-fetch data when userId or useApi state changes
  componentDidUpdate(prevProps, prevState) {
    if (this.state.userId !== prevState.userId || this.state.useApi !== prevState.useApi) {
      this.fetchDataIfNeeded();
    }
  }

  // Conditional data fetching based on userId
  fetchDataIfNeeded = () => {
    const { userId, useApi } = this.state;
    if (userId) {
      Promise.all([
        this.fetchUserBasicInfo(userId),
        this.fetchUserActivity(userId),
        this.fetchUserAverageSessions(userId),
        this.fetchUserPerformance(userId)
      ]).then(([basicInfo, activity, averageSessions, performance]) => {
        this.setState({ data: { basicInfo, activity, averageSessions, performance } });
      }).catch(error => {
        console.error("Failed to fetch data:", error);
      });
    }
  }

  // Generic method to fetch data from API or local
  fetchData = async (endpoint, localPath) => {
    let responseData;
    if (this.state.useApi) {
      const response = await axios.get(`http://localhost:3000/${endpoint}`);
      responseData = response.data;
    } else {
      const localData = await import(`../datas/${localPath}`);
      responseData = localData.default;
    }
    if (responseData && responseData.data) {
      responseData.data = normalizeUserData(responseData.data);
    }
    return responseData;
  }

  // Fetch methods for different user data aspects
  fetchUserBasicInfo = (id) => this.fetchData(`user/${id}`, `user_${id}.json`);
  fetchUserActivity = (id) => this.fetchData(`user/${id}/activity`, `user_${id}_activity.json`);
  fetchUserAverageSessions = (id) => this.fetchData(`user/${id}/average-sessions`, `user_${id}_average-sessions.json`);
  fetchUserPerformance = (id) => this.fetchData(`user/${id}/performance`, `user_${id}_performance.json`);

  // Method to toggle data source between API and local data
  toggleDataSource = () => {
    this.setState(prevState => ({ useApi: !prevState.useApi }));
  };

  // Method to set the current user ID and navigate to user's page
  selectUser = (id) => {
    this.setState({ userId: id });
    this.props.navigate(`/user/${id}`);
  };

  // Render method providing the context value to children
  render() {
    return (
      <DataContext.Provider value={{ selectUser: this.selectUser, toggleDataSource: this.toggleDataSource, data: this.state.data }}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}

// Functional wrapper component to utilize useNavigate hook
function DataProvider(props) {
  const navigate = useNavigate();

  return <DataProviderBase {...props} navigate={navigate} />;
}

export default DataProvider;
