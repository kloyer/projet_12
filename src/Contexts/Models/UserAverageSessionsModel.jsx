import axios from 'axios';

// Defining the UserAverageSessionsModel class
export default class UserAverageSessionsModel {
  // Constructor to initialize the class with the useApi flag
  constructor(useApi) {
    this.useApi = useApi; // Determines if data should be fetched from an API or local files
  }

  // Asynchronous method to fetch average session data for a specific user
  async fetchUserAverageSessions(userId) {
    // API endpoint for fetching user's average session data
    const endpoint = `user/${userId}/average-sessions`;
    // Path for local data file corresponding to the user's average session data
    const localPath = `user_${userId}_average-sessions.json`;
    let responseData;

    // Check if API should be used
    if (this.useApi) {
      // Fetching data from API using axios
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
