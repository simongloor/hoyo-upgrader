/* eslint-disable no-unused-vars */
import React from 'react';

import Artifact from './Artifact';

import '../styles/StatNeeds.scss';

export default function StatNeeds({
  artifactPieceName = 'flower',
  mainstats,
  substats,
  displayActive = true,
}) {
  console.log(mainstats, substats);
  const filteredSubstats = mainstats && substats && mainstats.length === 1
    ? substats.filter((stat) => !mainstats.includes(stat))
    : substats;

  const renderSubStats = (statType, stats) => (
    <div className={`${statType} stats`}>
      {
        stats.map((stat) => (
          <div key={stat} className={`stat ${stat}`} />
        ))
      }
    </div>
  );

  const renderMainStat = (stats) => (
    <div className="tiers">
      {stats.map((stat) => (
        <div key={stat} className="tier tile-marker empty">
          <div className={stat} />
        </div>
      ))}
    </div>
  );

  return (
    <div
      className="StatNeeds artifact-piece"
    >
      { substats && renderSubStats('sub', filteredSubstats) }
      <Artifact
        className={displayActive ? '' : 'filtered'}
        piece={artifactPieceName}
        set="generic"
      />
      { mainstats && renderMainStat(mainstats) }
    </div>
  );
}
