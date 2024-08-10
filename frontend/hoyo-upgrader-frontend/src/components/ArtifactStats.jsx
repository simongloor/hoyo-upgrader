/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import React from 'react';

import Substat from './Substat';
import CounterPiece from './CounterPiece';

import '../styles/ArtifactStats.scss';

const statOrder = [
  // 'impossibleSubstats',
  'enerRech_',
  'critRate_',
  'critDMG_',
  'atk_',
  'hp_',
  'def_',
  'eleMas',
  // 'missingRolls100',
  // 'missingRolls75',
  // 'missingRolls50',
  // 'missingRolls25',
  // 'wastedSubstats',
];

export default function ArtifactStats({
  relevantSubstats,
  uniformSubstatCount,
  showCounter = true,
}) {
  // console.log(uniformSubstatCount);
  let fillerSubstatCount = 0;
  if (uniformSubstatCount) {
    let relevantSubstatsCount = 0;
    if (relevantSubstats) {
      relevantSubstatsCount = Object.values(relevantSubstats.valuableSubstats)
        .reduce((acc, cur) => acc + cur, 0)
        + relevantSubstats.impossibleSubstats
        + relevantSubstats.wastedSubstats
        + relevantSubstats.missingRollChances.length;
    }
    fillerSubstatCount = Math.max(
      0,
      uniformSubstatCount ? uniformSubstatCount - relevantSubstatsCount : 0,
    );
  }
  // console.log('fillerSubstatCount', fillerSubstatCount);
  // console.log('relevantSubstats', relevantSubstats);

  // sort valuable substats by statOrder
  const sortedSubstats = {};
  statOrder.forEach((stat) => {
    if (Object.prototype.hasOwnProperty.call(relevantSubstats.valuableSubstats, stat)) {
      sortedSubstats[stat] = relevantSubstats.valuableSubstats[stat];
    }
  });
  // console.log('sortedSubstats', sortedSubstats);

  // render a
  return (
    <div
      className="ArtifactStats"
    >
      {
        // fill up the remaining substats
        Array(fillerSubstatCount).fill().map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={i} className="filler" />
        ))
      }
      {
        // render impossible substats
        Array(relevantSubstats.impossibleSubstats).fill().map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Substat key={`impossible-${i}`} stat="impossibleSubstats" />
        ))
      }
      {
        // render valuable substats
        Object.keys(sortedSubstats).map((stat) => (
          Array(sortedSubstats[stat]).fill().map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Substat key={`${stat}-${i}`} stat={stat} />
          ))
        ))
      }
      {
        // render missing rolls
        relevantSubstats.missingRollChances
          .sort((a, b) => b - a)
          .map((chance, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Substat key={`missingRoll-${i}`} stat="missingRoll" chance={chance} />
          ))
      }
      {
        // render wasted substats
        Array(relevantSubstats.wastedSubstats).fill().map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Substat key={`wasted-${i}`} stat="wastedSubstats" />
        ))
      }
      {
        showCounter && (
          <>
            <div className="separator" />
            <CounterPiece count={relevantSubstats.wastedSubstats} />
          </>
        )
      }
    </div>
  );
}
