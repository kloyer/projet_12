// src/contexts/models/UserPerformanceModel.jsx

import axios from 'axios';

const ACTIVITY_KIND_MAPPING = [
  "Intensité",
  "Vitesse",
  "Force",
  "Endurance",
  "Energie",
  "Cardio",
];

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

  // Check if responseData.data is an array before calling map
  if (Array.isArray(responseData.data)) {
    responseData.data = responseData.data.map(activity => ({
      activity: ACTIVITY_KIND_MAPPING[activity.kind - 1],
      value: activity.value,
    }));
  } else {
    // Handle the case where responseData.data is not an array
    console.error('responseData.data is not an array', responseData.data);
  }

    return responseData;
  }
}
