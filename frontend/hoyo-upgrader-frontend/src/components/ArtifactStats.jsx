/* eslint-disable prefer-const */
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

export default function ArtifactStats({
  relevantSubstats,
  uniformSubstatCount,
  showCounter = true,
}) {
  let fillerSubstatCount = 0;
  if (uniformSubstatCount) {
    const relevantSubstatsCount = relevantSubstats
      ? Object.values(relevantSubstats).reduce((acc, cur) => acc + cur, 0)
      : 0;
    fillerSubstatCount = uniformSubstatCount ? uniformSubstatCount - relevantSubstatsCount : 0;
  }

  // sort relevantSubstats by statOrder
  const sortedSubstats = {};
  statOrder.forEach((stat) => {
    if (Object.prototype.hasOwnProperty.call(relevantSubstats, stat)) {
      sortedSubstats[stat] = relevantSubstats[stat];
    }
  });

  // render a
  return (
    <div
      className="ArtifactStats"
    >
      {
        Array(fillerSubstatCount).fill().map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={i} className="filler" />
        ))
      }
      {
        Object.keys(sortedSubstats).map((stat) => (
          Array(sortedSubstats[stat]).fill().map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Substat key={`${stat}-${i}`} stat={stat} />
          ))
        ))
      }
      {
        showCounter && (
          <>
            <div className="separator" />
            <CounterPiece count={sortedSubstats.wastedSubstats} />
          </>
        )
      }
    </div>
  );
}
