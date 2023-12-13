import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';
import './RadarActivityChart.scss'

// Assuming this is the mapping provided by your system
const ACTIVITY_KIND_MAPPING = [
  "Intensité",
  "Vitesse",
  "Force",
  "Endurance",
  "Energie",
  "Cardio",
];

export function RadarActivityChart({ chartActivity }) {
  // Check if chartActivity and chartActivity.data are defined
  if (!chartActivity || !chartActivity.data) {
    return <div>Loading...</div>;
  }

  // Transform the data to match the format expected by the RadarChart
  const chartData = chartActivity.data.map(activity => ({
    activity: ACTIVITY_KIND_MAPPING[activity.kind - 1], // kind starts at 1
    value: activity.value,
  }));

  return (
    <div className="radar-activity__container">
    <ResponsiveContainer width="100%" height="100%">
			<RadarChart cx='50%' cy='50%' outerRadius='65%' data={chartData}>
				<PolarGrid gridType="polygon" radialLines={false}/>
				<PolarAngleAxis	dataKey="activity" stroke='white' tickLine={false}  tick={{ fontSize: 10 }}/>
				<Radar dataKey='value' stroke='#FF0101'	fill='#FF0101' fillOpacity={0.7} />
			</RadarChart>
    </ResponsiveContainer>
    </div>
  );
}


export default RadarActivityChart;