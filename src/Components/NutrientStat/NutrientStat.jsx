import React from 'react';
import './NutrientStat.scss';

function NutrientStat({ amount, nutrient, iconSrc }) {
  return (
    <div className="nutrient-stat">
      <img src={iconSrc} alt={nutrient} className="nutrient-stat__icon" />
      <div className="nutrient-stat__info">
        <span className="nutrient-stat__amount">{amount}</span>
        <span className="nutrient-stat__type">{nutrient}</span>
      </div>
    </div>
  );
}

export default NutrientStat;