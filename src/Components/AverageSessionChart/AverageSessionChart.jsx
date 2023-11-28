import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Text } from "recharts";
import './AverageSessionChart.scss'

export function AverageSessionChart({ averageSessionActivity }) {
    if (!averageSessionActivity) {
      return <div>Loading...</div>;
    }

// Function to map day numbers to French weekday initials
const dayToLetter = (day) => {
    const mapping = {
      1: 'L', // Lundi
      2: 'M', // Mardi
      3: 'M', // Mercredi
      4: 'J', // Jeudi
      5: 'V', // Vendredi
      6: 'S', // Samedi
      7: 'D', // Dimanche
    };
    return mapping[day] || '';
  };  

    return (
        <div class='average-session__container'>
          <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={averageSessionActivity.sessions} 
            strokeWidth={1} 
          >
            <Text>
              Durée moyenne de sessions
            </Text>
            <XAxis
                type="category"
                dataKey="day" tickFormatter={dayToLetter}
                tickLine={true}
                stroke="red"
                padding={{right:5, left:5}}
                tick={{ fontSize: 13, stroke: "white", opacity: 0.8}}
            />
            <YAxis
                dataKey="sessionLength"
                domain={[0, "dataMax + 30"]}
                hide={true}
            />
            <Tooltip />
            <Line
                type="monotone"
                dataKey="sessionLength"
                stroke="rgba(255, 255, 255, 0.7)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 4, stroke: "white" }}
            />
          </LineChart>
          </ResponsiveContainer>
        </div>
    );
}

export default AverageSessionChart;