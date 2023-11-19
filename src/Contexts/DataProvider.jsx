import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import localData from '../datas/data.json';
import { useNavigate } from 'react-router-dom';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [useApi, setUseApi] = useState(false);
  const navigate = useNavigate();

  const selectUser = (id) => {
    setUserId(id);
    navigate(`/user/${id}`);
  };

  const [userId, setUserId] = useState(null);

  const toggleDataSource = () => {
    setUseApi(!useApi);
  };

  const fetchUserDataFromApi = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/user/${id}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  const getUserDataFromJson = (id) => {
    const userData = localData.users.find(user => user.userId === id);
    if (userData) {
      setData(userData);
    } else {
      console.error('User not found in local data');
    }
  };

  useEffect(() => {
    if (userId) {
      if (useApi) {
        fetchUserDataFromApi(userId);
      } else {
        getUserDataFromJson(userId);
      }
    }
  }, [userId, useApi]);

  return (
    <DataContext.Provider value={{ data, selectUser, toggleDataSource }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
