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

    return (
        <div className="score__container">
          <p className="score__header">Score</p>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <text
                x="50%"
                y="45%"
                dy={0}
                textAnchor="middle"
                dominantBaseline="central"
                className="pie-text"
              >
                {score}%<tspan dy={18} dx={-50}>de votre</tspan>
                <tspan dy={20} x="50%" className="pie-text-small">objectif</tspan>
              </text>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={70}
                outerRadius={80}
                startAngle={90}
                endAngle={450}
                blendStroke
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
    );
}

export default ScorePieChart;
