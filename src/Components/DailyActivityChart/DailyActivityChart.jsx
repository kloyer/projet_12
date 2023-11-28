import './DailyActivityChart.scss';
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export function DailyActivityChart({ dailyActivity }) {
  if (!dailyActivity) {
    return <div>Loading...</div>;
  }

  return (
    <div class="daily-activity">
      <div class="daily-activity__header">
        <div class="daily-activity__title">Activité quotidienne</div>
        <div class="daily-activity__infos">
            <p>Poids (kg)</p>
            <p>Calories brûlées (kCal)</p>
        </div>
      </div>
      <ResponsiveContainer  height={200} >
      <BarChart data={dailyActivity.sessions} barGap={8} barCategoryGap={1}>
          <CartesianGrid vertical={false} strokeDasharray="1 1"/>
          <XAxis dataKey="day" tickLine={false} tick={{fontSize: 14}} dy={15} stroke="1 1"/>
          <YAxis yAxisId="kilogram" dataKey="kilogram" type="number" domain={['dataMin - 2', 'dataMax + 1']} tickCount="4" axisLine={false} orientation="right" tickLine={false} tick={{fontSize: 14}} dx={15}/>
          <YAxis yAxisId="calories" dataKey="calories" type="number" domain={['dataMin - 20', 'dataMax + 10']}  hide={true}/>
          {/* <Tooltip content={<ActivityToolType/>}/> */}
          <Bar yAxisId="kilogram" dataKey="kilogram" fill="#282D30" barSize={7} radius={[50, 50, 0, 0]}/>
          <Bar yAxisId="calories" dataKey="calories" fill="#E60000" barSize={7} radius={[50, 50, 0, 0]}/>
      </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DailyActivityChart;
