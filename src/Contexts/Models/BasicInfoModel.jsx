// src/contexts/models/BasicInfoModel.jsxq
import axios from 'axios';

// Defining the BasicInfoModel class
export default class BasicInfoModel {
  // Constructor to initialize the class with the useApi flag
  constructor(useApi) {
    this.useApi = useApi; // Determines whether to use an API or local data
  }

  // Asynchronous method to fetch basic information for a given user
  async fetchBasicInfo(userId) {
    // Endpoint for the user data
    const endpoint = `user/${userId}`;
    // Path for the local user data file
    const localPath = `user_${userId}.json`;
    let responseData;

    // Check if API should be used
    if (this.useApi) {
      // Fetching data from API using axios
      console.log("Fetching User Activity from API");
      const response = await axios.get(`http://localhost:3000/${endpoint}`);
      // Extracting data from the API response
      responseData = response.data;
    } else {
      // Fetching local data using dynamic import
      console.log("Fetching User Activity from Mocked Data");
      const localData = await import(`../../datas/${localPath}`);
      // Extracting data from the local data file
      responseData = localData.default;
    }

    // Returning the fetched data
    return responseData;
  }
}
