import axios from 'axios';

// Defining the UserPerformanceModel class
export default class UserPerformanceModel {
  // Constructor for initializing the class with the useApi flag
  constructor(useApi) {
    this.useApi = useApi; // Determines if data should be fetched from an API or local files
  }

  // Asynchronous method to fetch performance data for a specific user
  async fetchUserPerformance(userId) {
    // API endpoint for fetching user's performance data
    const endpoint = `user/${userId}/performance`;
    // Path for local data file corresponding to the user's performance data
    const localPath = `user_${userId}_performance.json`;
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
