// src/components/ScorePieChart.jsx
import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import './ScorePieChart.scss'

// Defining the ScorePieChart functional component
export function ScorePieChart({ pieChartInfos }) {
    // Render a loading message if the data is not available
    if (!pieChartInfos || !pieChartInfos.data) {
        return <div>Loading...</div>;
    }

    // Determining which score key to use ('todayScore' or 'score')
    const scoreKey = pieChartInfos.data.todayScore !== undefined ? 'todayScore' : 'score';
    const scoreValue = pieChartInfos.data[scoreKey];

    // Preparing data for the pie chart
    const data = [
        { name: 'Score', value: scoreValue },
        { name: 'Remaining', value: 1 - scoreValue },
    ];

    // Colors for the pie chart segments
    const COLORS = ['#FF0000', '#EAEAEA'];
    // Converting score to a percentage
    const score = Math.round(scoreValue * 100);

    // Render the pie chart
    return (
        <div className="score__container">
          <p className="score__header">Score</p>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              {/* Text inside the pie chart */}
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
              {/* Pie chart configuration */}
              <Pie
                data={data}
                dataKey="value"
                innerRadius={70}
                outerRadius={80}
                startAngle={90}
                endAngle={450}
                blendStroke
              >
                {/* Coloring each segment of the pie */}
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
