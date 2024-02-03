// src/components/DailyActivityChart.jsx
import './DailyActivityChart.scss';
import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip
} from "recharts";

// Defining the DailyActivityChart functional component
export function DailyActivityChart({ dailyActivity }) {
  // Render a loading message if no data is available
  if (!dailyActivity) {
    return <div>Loading...</div>;
  }

  // Custom Tooltip component for displaying detailed data on hover
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${payload[0].payload.kilogram}kg`}</p>
          <p className="label">{`${payload[0].payload.calories}Kcal`}</p>
        </div>
      );
    }
  
    return null;
  };

  // Render the bar chart
  return (
    <div className="daily-activity">
      <div className="daily-activity__header">
        <div className="daily-activity__title">Activité quotidienne</div>
        <div className="daily-activity__infos">
          <p><span className="dot weight-dot"></span>Poids (kg)</p>
          <p><span className="dot calories-dot"></span>Calories brûlées (kCal)</p>
        </div>
      </div>
      <ResponsiveContainer height={200} >
        <BarChart data={dailyActivity.sessions} barGap={8} barCategoryGap={1}>
            <CartesianGrid vertical={false} strokeDasharray="1 1"/>
            <XAxis dataKey="day" tickLine={false} tick={{fontSize: 14}} dy={15} stroke="1 1" tickFormatter={(value, index) => index + 1}/>
            <YAxis yAxisId="kilogram" dataKey="kilogram" type="number" domain={['dataMin - 2', 'dataMax + 1']} tickCount="4" axisLine={false} orientation="right" tickLine={false} tick={{fontSize: 14}} dx={15}/>
            <YAxis yAxisId="calories" dataKey="calories" type="number" domain={['dataMin - 20', 'dataMax + 10']} hide={true}/>
            <Tooltip content={<CustomTooltip />} />
            <Bar yAxisId="kilogram" dataKey="kilogram" fill="#282D30" barSize={7} radius={[50, 50, 0, 0]}/>
            <Bar yAxisId="calories" dataKey="calories" fill="#E60000" barSize={7} radius={[50, 50, 0, 0]}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DailyActivityChart;
