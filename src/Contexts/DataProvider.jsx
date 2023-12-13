import React, { Component, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BasicInfoModel from './Models/BasicInfoModel';
import UserActivityModel from './Models/UserActivityModel';
import UserAverageSessionsModel from './Models/UserAverageSessionsModel';
import UserPerformanceModel from './Models/UserPerformanceModel';

const DataContext = createContext();

export const useData = () => React.useContext(DataContext);

class DataProviderBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      useApi: true,
      userId: null,
    };

    this.basicInfoModel = new BasicInfoModel(this.state.useApi);
    this.userActivityModel = new UserActivityModel(this.state.useApi);
    this.userAverageSessionsModel = new UserAverageSessionsModel(this.state.useApi);
    this.userPerformanceModel = new UserPerformanceModel(this.state.useApi);
  }

  componentDidMount() {
    this.fetchDataIfNeeded();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.userId !== prevState.userId || this.state.useApi !== prevState.useApi) {
      this.fetchDataIfNeeded();
    }
  }

  fetchDataIfNeeded = () => {
    const { userId } = this.state;
    if (userId) {
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

  toggleDataSource = () => {
    this.setState(prevState => ({ useApi: !prevState.useApi }));
  };

  selectUser = (id) => {
    this.setState({ userId: id });
    this.props.navigate(`/user/${id}`);
  };

  render() {
    return (
      <DataContext.Provider value={{ selectUser: this.selectUser, toggleDataSource: this.toggleDataSource, data: this.state.data }}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}

function DataProvider(props) {
  const navigate = useNavigate();

  return <DataProviderBase {...props} navigate={navigate} />;
}

export default DataProvider;
