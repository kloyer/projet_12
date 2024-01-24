import React, { Component, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BasicInfoModel from './Models/BasicInfoModel';
import UserActivityModel from './Models/UserActivityModel';
import UserAverageSessionsModel from './Models/UserAverageSessionsModel';
import UserPerformanceModel from './Models/UserPerformanceModel';

// Creating a new Context for data sharing
const DataContext = createContext();

// Custom hook for consuming DataContext
export const useData = () => React.useContext(DataContext);

// Base class component for data management
class DataProviderBase extends Component {
  constructor(props) {
    super(props);
    // Initializing state with data object, API usage flag, and user ID
    this.state = {
      data: {},
      useApi: true,
      userId: null,
    };

    // Initializing data model instances with the API flag
    this.basicInfoModel = new BasicInfoModel(this.state.useApi);
    this.userActivityModel = new UserActivityModel(this.state.useApi);
    this.userAverageSessionsModel = new UserAverageSessionsModel(this.state.useApi);
    this.userPerformanceModel = new UserPerformanceModel(this.state.useApi);
  }

  // Lifecycle method to fetch data after component mounts
  componentDidMount() {
    this.fetchDataIfNeeded();
  }

  // Lifecycle method to re-fetch data when certain state variables change
  componentDidUpdate(prevProps, prevState) {
    if (this.state.userId !== prevState.userId || this.state.useApi !== prevState.useApi) {
      this.fetchDataIfNeeded();
    }
  }

  // Method to fetch data if a user ID is set
  fetchDataIfNeeded = () => {
    const { userId } = this.state;
    if (userId) {
      // Fetching data from all models and updating the state
      Promise.all([
        this.basicInfoModel.fetchBasicInfo(userId),
        this.userActivityModel.fetchUserActivity(userId),
        this.userAverageSessionsModel.fetchUserAverageSessions(userId),
        this.userPerformanceModel.fetchUserPerformance(userId)
      ]).then(([basicInfo, activity, averageSessions, performance]) => {
        this.setState({ data: { basicInfo, activity, averageSessions, performance } });
      }).catch(error => {
        console.error("Failed to fetch data:", error);
      });
    }
  };

  // Method to toggle the data source between API and local data
  toggleDataSource = () => {
    this.setState(prevState => ({ useApi: !prevState.useApi }));
  };

  // Method to set the current user ID and navigate to the user's page
  selectUser = (id) => {
    this.setState({ userId: id });
    this.props.navigate(`/user/${id}`);
  };

  // Rendering the provider with context value
  render() {
    return (
      <DataContext.Provider value={{ selectUser: this.selectUser, toggleDataSource: this.toggleDataSource, data: this.state.data }}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}

// Functional component to use the useNavigate hook
function DataProvider(props) {
  const navigate = useNavigate();

  // Wrapping DataProviderBase with the navigate prop
  return <DataProviderBase {...props} navigate={navigate} />;
}

export default DataProvider;
