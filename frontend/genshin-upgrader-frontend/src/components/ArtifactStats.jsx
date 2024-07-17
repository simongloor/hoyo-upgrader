/* eslint-disable no-unused-vars */
import React from 'react';

import Substat from './Substat';
import CounterPiece from './CounterPiece';

import '../styles/ArtifactStats.scss';

const statOrder = [
  'impossibleSubstats',
  'enerRech_',
  'critRate_',
  'critDMG_',
  'atk_',
  'hp_',
  'def_',
  'eleMas',
  'missingRolls100',
  'missingRolls75',
  'missingRolls50',
  'missingRolls25',
  'wastedSubstats',
];

export default function ArtifactStats({ totalSubstats }) {
  // sort totalSubstats by statOrder
  const sortedSubstats = {};
  statOrder.forEach((stat) => {
    if (Object.prototype.hasOwnProperty.call(totalSubstats, stat)) {
      sortedSubstats[stat] = totalSubstats[stat];
    }
  });

  // render a
  return (
    <div
      className="ArtifactStats"
    >
      {
        Object.keys(sortedSubstats).map((stat) => (
          Array(sortedSubstats[stat]).fill().map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Substat key={`${stat}-${i}`} stat={stat} />
          ))
        ))
      }
      <CounterPiece count={sortedSubstats.wastedSubstats} />
    </div>
  );
}
