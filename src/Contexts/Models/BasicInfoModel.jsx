import axios from 'axios';

export default class BasicInfoModel {
  constructor(useApi) {
    this.useApi = useApi;
  }

  async fetchBasicInfo(userId) {
    const endpoint = `user/${userId}`;
    const localPath = `user_${userId}.json`;
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
