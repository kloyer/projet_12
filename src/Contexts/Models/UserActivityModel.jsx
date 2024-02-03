// src/contexts/models/UserActivityModel.jsx
import axios from 'axios';

// Defining the UserActivityModel class
export default class UserActivityModel {
  // Constructor for initializing the class with the useApi flag
  constructor(useApi) {
    this.useApi = useApi; // Determines whether to use an API or local data
  }

  // Asynchronous method to fetch activity data for a specific user
  async fetchUserActivity(userId) {
    // Defining the API endpoint for user activity data
    const endpoint = `user/${userId}/activity`;
    // Defining the path for local user activity data
    const localPath = `user_${userId}_activity.json`;
    let responseData;

    // Checking if the API should be used
    if (this.useApi) {
      // Fetching data from the API using axios
      const response = await axios.get(`http://localhost:3000/${endpoint}`);
      // Extracting data from the API response
      responseData = response.data;
    } else {
      // Fetching local data using dynamic import
      const localData = await import(`../../datas/${localPath}`);
      // Extracting data from the local data file
      responseData = localData.default;
    }

    // Returning the fetched data
    return responseData;
  }
}
