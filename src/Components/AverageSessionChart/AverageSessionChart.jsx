import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Text } from "recharts";
import './AverageSessionChart.scss'

// Defining the AverageSessionChart functional component
export function AverageSessionChart({ averageSessionActivity }) {
    // Render a loading message if data is not available
    if (!averageSessionActivity) {
      return <div>Loading...</div>;
    }

    // Function to convert day numbers into French weekday initials
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

    // Render the line chart using the recharts library
    return (
        <div className='average-session__container'>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={averageSessionActivity.sessions} // Setting the data for the line chart
              strokeWidth={1} 
            >
              <Text>
                Durée moyenne de sessions
              </Text>
              <XAxis
                  type="category"
                  dataKey="day" // Using the 'day' data field for the X-axis
                  tickFormatter={dayToLetter} // Formatting the ticks using the dayToLetter function
                  tickLine={true}
                  stroke="red"
                  padding={{right:5, left:5}}
                  tick={{ fontSize: 13, stroke: "white", opacity: 0.8}}
              />
              <YAxis
                  dataKey="sessionLength" // Using the 'sessionLength' data field for the Y-axis
                  domain={[0, "dataMax + 30"]}
                  hide={true} // Hiding the Y-axis
              />
              <Tooltip />
              <Line
                  type="monotone"
                  dataKey="sessionLength" // Defining the data key for the line
                  stroke="rgba(255, 255, 255, 0.7)"
                  strokeWidth={2}
                  dot={false} // Disabling dots on the line
                  activeDot={{ r: 4, strokeWidth: 4, stroke: "white" }} // Styling for active dots
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
    );
}

export default AverageSessionChart;
