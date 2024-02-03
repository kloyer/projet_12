// src/contexts/models/UserAverageSessionsModel.jsx

import axios from 'axios';

export default class UserAverageSessionsModel {
  constructor(useApi) {
    this.useApi = useApi;
  }

  dayToLetter(day) {
    const mapping = {
      1: 'L',
      2: 'M',
      3: 'M',
      4: 'J',
      5: 'V',
      6: 'S',
      7: 'D',
    };
    return mapping[day] || '';
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

    responseData.data.sessions = responseData.data.sessions.map(session => ({
      ...session,
      day: this.dayToLetter(session.day),
    }));

    return responseData;
  }
}
