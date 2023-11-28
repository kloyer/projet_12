// UserStatsPage.jsx
import React from 'react';
import { useData } from '../Contexts/DataProvider';
import { useParams } from 'react-router-dom';
import DailyActivityChart from '../Components/DailyActivityChart/DailyActivityChart';
import RadarChart from '../Components/RadarActivityChart/RadarActivityChart'
import AverageSessionChart from '../Components/AverageSessionChart/AverageSessionChart';
import ScorePieChart from '../Components/ScorePieChart/ScorePieChart';
import Header from '../Components/Header/Header';
import Sidebar from '../Components/Sidebar/Sidebar';
import NutrientStat from '../Components/NutrientStat/NutrientStat';
import caloriesIcon from '../assets/caloriesIcon.png';
import proteinsIcon from '../assets/proteinsIcon.png';
import carbsIcon from '../assets/carbsIcon.png';
import fatsIcon from '../assets/fatsIcon.png';

function UserStatsPage() {
  const { userId } = useParams();
  const { data, isLoading, error } = useData();

  if (isLoading || !data) {
    return <div>Loading user data...</div>;
  }

  if (error) {
    return <div>Error fetching user data: {error.message}</div>;
  }

  const userInfo = data.basicInfo?.data?.userInfos;
  const keyData = data.basicInfo?.data?.keyData;
  const activityData = data.activity?.data;
  const averageSessionData = data.averageSessions?.data;
  const performanceData = data.performance?.data;
  const basicInfo = data.basicInfo;

  // console.log("User ID:", data.basicInfo?.data?.id);
  // console.log("First Name:", userInfo?.firstName);
  // console.log("Last Name:", userInfo?.lastName);
  // console.log("Age:", userInfo?.age);
  // console.log("Today's Score:", data.basicInfo?.data?.todayScore);
  // console.log("Calorie Count:", keyData?.calorieCount);
  // console.log("Protein Count:", keyData?.proteinCount);
  // console.log("Carbohydrate Count:", keyData?.carbohydrateCount);
  // console.log("Lipid Count:", keyData?.lipidCount);
  // console.log("Activity User ID:", activityData?.userId);
  // console.log("Activity Sessions:", JSON.stringify(activityData?.sessions, null, 2));
  // console.log("Average Sessions User ID:", averageSessionData?.userId);
  // console.log("Average Sessions Details:", JSON.stringify(averageSessionData?.sessions, null, 2));
  // console.log("Performance User ID:", performanceData?.userId);
  // console.log("Performance Kinds:", JSON.stringify(performanceData?.kind, null, 2));
  // console.log("Performance Data:", JSON.stringify(performanceData?.data, null, 2));
  const firstName = userInfo?.firstName;
  console.log(basicInfo);
  return (
    <div>
      <Sidebar />
      <div className="main-content">
        <Header />
        <div class="user-greeting">
          <h1>Bonjour <span>{firstName}</span></h1>
          <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
        </div>
        <div class="datas-container">
          <div class="datas-container__left-content">
            <DailyActivityChart dailyActivity={activityData || []} />
            <div class="square-charts">
              <RadarChart chartActivity={performanceData || []}/>
              <AverageSessionChart averageSessionActivity={averageSessionData || []}/>
              <ScorePieChart pieChartInfos={basicInfo || []}/>
            </div>
          </div>
          <div class="datas-container__right-content">
            <div className="nutrition-stats">
              <NutrientStat amount="1,930kCal" nutrient="Calories" iconSrc={caloriesIcon} />
              <NutrientStat amount="155g" nutrient="Proteins" iconSrc={proteinsIcon} />
              <NutrientStat amount="290g" nutrient="Carbs" iconSrc={carbsIcon} />
              <NutrientStat amount="50g" nutrient="Fats" iconSrc={fatsIcon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserStatsPage;
