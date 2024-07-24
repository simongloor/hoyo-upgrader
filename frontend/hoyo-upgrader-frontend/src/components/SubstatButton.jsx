/* eslint-disable no-unused-vars */
import React from 'react';
import paths from '../data/paths';
// import '../styles/SubstatButton.scss';

export default function SubstatButton({ statName, onClick, isActive }) {
  return (
    <button
      className="SubstatButton"
      type="button"
      onClick={() => onClick && onClick(statName)}
    >
      <span className={`stat ${statName} ${isActive ? 'active' : 'inactive'}`}>
        {paths.stats[statName]}
      </span>
    </button>
  );
}
