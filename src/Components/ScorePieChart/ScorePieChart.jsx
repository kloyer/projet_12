import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Text } from "recharts";
import './ScorePieChart.scss'

export function ScorePieChart({ pieChartInfos }) {
    if (!pieChartInfos || !pieChartInfos.data) {
        return <div>Loading...</div>;
    }

    const data = [
        { name: 'Score', value: pieChartInfos.data.todayScore },
        { name: 'Remaining', value: 1 - pieChartInfos.data.todayScore },
    ];

    const COLORS = ['#FF0000', '#EAEAEA'];
    const score = Math.round(pieChartInfos.data.todayScore * 100);
    console.log('score', score, "%")

    return (
        <div className="score__container">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Text>
                Score
              </Text>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={70}
                startAngle={90}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              <Text>
                {score}
              </Text>
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
    );
}

export default ScorePieChart;
