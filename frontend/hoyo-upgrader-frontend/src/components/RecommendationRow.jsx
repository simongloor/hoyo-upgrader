/* eslint-disable no-unused-vars */
import React from 'react';

import Artifact from './Artifact';
import SpacerPiece from './SpacerPiece';

// import '../styles/RecommendationRow.scss';

export default function RecommendationRow({ set, data, onClick }) {
  return (
    <div
      className="RecommendationRow row"
    >
      <Artifact
        piece={set}
      />
      <SpacerPiece />
      {
        data.sortedGroups
          .filter((group) => data.groups[group].piece === set)
          .slice(0, 14)
          .map((group) => (
            <button
              type="button"
              onClick={() => onClick(group)}
              alt={group}
              key={group}
            >
              <Artifact
                piece={data.groups[group].piece}
                set={data.groups[group].set}
                mainstat={data.groups[group].stat}
                count={Math.ceil(data.groups[group].count)}
                key={`${data.groups[group].set}-${data.groups[group].piece}-${data.groups[group].mainstat}`}
              />
            </button>
          ))
      }
    </div>
  );
}
