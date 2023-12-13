import axios from 'axios';

export default class UserActivityModel {
  constructor(useApi) {
    this.useApi = useApi;
  }

  async fetchUserActivity(userId) {
    const endpoint = `user/${userId}/activity`;
    const localPath = `user_${userId}_activity.json`;
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
