// src/components/NutrientStat.jsx
import React from 'react';
import './NutrientStat.scss';

// Defining the NutrientStat functional component
// It accepts props: amount, nutrient, and iconSrc for customization
function NutrientStat({ amount, nutrient, iconSrc }) {
  return (
    // Main container for the nutrient statistic
    <div className="nutrient-stat">
      {/* Displaying the icon associated with the nutrient */}
      <img src={iconSrc} alt={nutrient} className="nutrient-stat__icon" />
      {/* Container for the nutrient information */}
      <div className="nutrient-stat__info">
        {/* Displaying the amount of the nutrient */}
        <span className="nutrient-stat__amount">{amount}</span>
        {/* Displaying the type/name of the nutrient */}
        <span className="nutrient-stat__type">{nutrient}</span>
      </div>
    </div>
  );
}

export default NutrientStat;
