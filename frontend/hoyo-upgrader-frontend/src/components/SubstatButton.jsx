/* eslint-disable no-unused-vars */
import React from 'react';
import paths from '../data/paths';
import '../styles/SubstatButton.scss';

export default function SubstatButton({
  statName,
  onClick,
  isActive,
  isShort,
}) {
  return (
    <button
      className={`SubstatButton stat ${statName} ${isActive ? 'active' : 'inactive'}`}
      type="button"
      onClick={() => onClick && onClick(statName)}
    >
      <span>
        {
          isShort
            ? paths.statsShort[statName]
            : paths.stats[statName]
        }
      </span>
    </button>
  );
}
