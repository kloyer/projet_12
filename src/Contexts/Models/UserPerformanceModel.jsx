import axios from 'axios';

export default class UserPerformanceModel {
  constructor(useApi) {
    this.useApi = useApi;
  }

  async fetchUserPerformance(userId) {
    const endpoint = `user/${userId}/performance`;
    const localPath = `user_${userId}_performance.json`;
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
