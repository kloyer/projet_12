import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

const normalizeUserData = (userData) => {
  if (userData.hasOwnProperty('score')) {
    userData.todayScore = userData.score;
    delete userData.score;
  }
  return userData;
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [useApi, setUseApi] = useState(true);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const fetchData = async (endpoint, localPath) => {
    let responseData;
    if (useApi) {
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
  };

  const fetchUserBasicInfo = (id) => fetchData(`user/${id}`, `user_${id}.json`);
  const fetchUserActivity = (id) => fetchData(`user/${id}/activity`, `user_${id}_activity.json`);
  const fetchUserAverageSessions = (id) => fetchData(`user/${id}/average-sessions`, `user_${id}_average-sessions.json`);
  const fetchUserPerformance = (id) => fetchData(`user/${id}/performance`, `user_${id}_performance.json`);

  useEffect(() => {
    if (userId) {
      Promise.all([
        fetchUserBasicInfo(userId),
        fetchUserActivity(userId),
        fetchUserAverageSessions(userId),
        fetchUserPerformance(userId)
      ]).then(([basicInfo, activity, averageSessions, performance]) => {
        setData({ basicInfo, activity, averageSessions, performance });
      }).catch(error => {
        console.error("Failed to fetch data:", error);
      });
    }
  }, [userId, useApi]);

  const toggleDataSource = () => {
    setUseApi(!useApi);
    console.log(`Data source will be toggled. Current source: ${useApi ? 'API' : 'local JSON'}.`);
  };

  const selectUser = (id) => {
    setUserId(id);
    navigate(`/user/${id}`);
  };

  return (
    <DataContext.Provider value={{ selectUser, toggleDataSource, data }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
