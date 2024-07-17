/* eslint-disable no-unused-vars */
import React from 'react';

import iconWasted from '../theme/wasted.svg';

// import '../styles/Substat.scss';

export default function Substat({ stat }) {
  return (
    <div
      className={`Substat ${stat}`}
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
