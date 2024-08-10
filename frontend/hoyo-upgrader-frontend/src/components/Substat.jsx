/* eslint-disable no-unused-vars */
import React from 'react';

import iconWasted from '../theme/wasted.svg';

// import '../styles/Substat.scss';

export default function Substat({
  stat,
  chance = 1,
  isHighlighted = false,
}) {
  return (
    <div
      className={`Substat ${stat} ${isHighlighted ? 'highlighted' : ''}`}
      style={{ height: `${chance * 100}%` }}
    >
      {
        (stat === 'wastedSubstats' || stat === 'impossibleSubstats') && (
          <img
            className="icon"
            src={iconWasted}
            alt="wasted"
          />
        )
      }
    </div>
  );
}
