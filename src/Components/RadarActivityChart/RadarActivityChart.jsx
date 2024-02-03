// src/components/RadarActivityChart.jsx
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import './RadarActivityChart.scss'

// Predefined mapping of activity types
const ACTIVITY_KIND_MAPPING = [
  "Intensité",
  "Vitesse",
  "Force",
  "Endurance",
  "Energie",
  "Cardio",
];

// Defining the RadarActivityChart functional component
export function RadarActivityChart({ chartActivity }) {
  // Render a loading message if data is not available
  if (!chartActivity || !chartActivity.data) {
    return <div>Loading...</div>;
  }
  
  const chartData = chartActivity.data;

  // Render the radar chart
  return (
    <div className="radar-activity__container">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx='50%' cy='50%' outerRadius='65%' data={chartData}>
          {/* Grid styling inside the radar chart */}
          <PolarGrid gridType="polygon" radialLines={false}/>
          {/* Axis for each activity type */}
          <PolarAngleAxis	dataKey="activity" stroke='white' tickLine={false}  tick={{ fontSize: 10 }}/>
          {/* Radar representation of the data */}
          <Radar dataKey='value' stroke='#FF0101'	fill='#FF0101' fillOpacity={0.7} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RadarActivityChart;
