import React from 'react';
import { useData } from '../Contexts/DataProvider';
import { useParams } from 'react-router-dom';
import DailyActivityChart from '../Components/DailyActivityChart/DailyActivityChart';
import RadarChart from '../Components/RadarActivityChart/RadarActivityChart';
import AverageSessionChart from '../Components/AverageSessionChart/AverageSessionChart';
import ScorePieChart from '../Components/ScorePieChart/ScorePieChart';
import Header from '../Components/Header/Header';
import Sidebar from '../Components/Sidebar/Sidebar';
import NutrientStat from '../Components/NutrientStat/NutrientStat';
import caloriesIcon from '../assets/caloriesIcon.png';
import proteinsIcon from '../assets/proteinsIcon.png';
import carbsIcon from '../assets/carbsIcon.png';
import fatsIcon from '../assets/fatsIcon.png';

// Defining the UserStatsPage functional component
function UserStatsPage() {
  const { userId } = useParams(); // Retrieving the user ID from URL parameters
  const { data, isLoading, error } = useData(); // Using the custom hook to access shared data

  // Handling loading state
  if (isLoading || !data) {
    return <div>Loading user data...</div>;
  }

  // Handling error state
  if (error) {
    return <div>Error fetching user data: {error.message}</div>;
  }

  // Extracting data for different components
  const userInfo = data.basicInfo?.data?.userInfos;
  const activityData = data.activity?.data;
  const averageSessionData = data.averageSessions?.data;
  const performanceData = data.performance?.data;
  const basicInfo = data.basicInfo;
  const firstName = userInfo?.firstName;

  // Returning the JSX for the UserStatsPage
  return (
    <div>
      <Sidebar />
      <Header />
      <div className="main-content">
        <div className="user-greeting">
          <h1>Bonjour <span>{firstName}</span></h1>
          <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
        </div>
        <div className="datas-container">
          <div className="datas-container__left-content">
            <DailyActivityChart dailyActivity={activityData || []} />
            <div className="square-charts">
              <AverageSessionChart averageSessionActivity={averageSessionData || []}/>
              <RadarChart chartActivity={performanceData || []}/>
              <ScorePieChart pieChartInfos={basicInfo || []}/>
            </div>
          </div>
          <div className="datas-container__right-content">
            <div className="nutrition-stats">
              {/* NutrientStat components for displaying key data like calories, proteins, etc. */}
              <NutrientStat amount={data.basicInfo?.data.keyData.calorieCount + "kCal"} nutrient="Calories" iconSrc={caloriesIcon} />
              <NutrientStat amount={data.basicInfo?.data.keyData.proteinCount + "g"} nutrient="Proteins" iconSrc={proteinsIcon} />
              <NutrientStat amount={data.basicInfo?.data.keyData.carbohydrateCount + "g"} nutrient="Carbs" iconSrc={carbsIcon} />
              <NutrientStat amount={data.basicInfo?.data.keyData.lipidCount + "g"} nutrient="Fats" iconSrc={fatsIcon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserStatsPage;
