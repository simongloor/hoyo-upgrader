/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch } from 'react-redux';

import { possibleStats } from '../data/substats';
import paths from '../data/paths';

import Box from './Box';
import SubstatButton from './SubstatButton';
import { toggleMainstatFilter } from '../data/actions/filter';

// import '../styles/FilterStats.scss';

export default function FilterStats({ piece, filter }) {
  const dispatch = useDispatch();
  if (!piece || !possibleStats[piece]) {
    return null;
  }

  const handleClick = (stat) => {
    dispatch(toggleMainstatFilter(piece, stat));
  };

  // render
  return (
    <Box
      className="FilterStats row"
    >
      {
        possibleStats[piece].map((stat) => (
          <SubstatButton
            key={stat}
            statName={stat}
            onClick={handleClick}
            isActive={!filter.mainstat[piece] || filter.mainstat[piece] === stat}
            isShort
          />
        ))
      }
    </Box>
  );
}
