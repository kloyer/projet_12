import axios from 'axios';

export default class UserAverageSessionsModel {
  constructor(useApi) {
    this.useApi = useApi;
  }

  async fetchUserAverageSessions(userId) {
    const endpoint = `user/${userId}/average-sessions`;
    const localPath = `user_${userId}_average-sessions.json`;
    let responseData;

    if (this.useApi) {
      const response = await axios.get(`http://localhost:3000/${endpoint}`);
      responseData = response.data;
    } else {
      const localData = await import(`../../datas/${localPath}`);
      responseData = localData.default;
    }

    return responseData;
  }
}
