/* eslint-disable no-unused-vars */
import React from 'react';

import paths from '../data/paths';

import Artifact from './Artifact';
import Box from './Box';
import ArtifactMultiSet from './ArtifactMultiSet';
import SpacerPiece from './SpacerPiece';
// import '../styles/ArtifactGroupCounts.scss';

export default function ArtifactGroupCounts({ counts }) {
  // event handlers
  const handleClickGroup = (group) => {
    console.log(`Artifact Group: ${group}`);
  };
  return (
    <Box
      className="ArtifactInventory"
    >
      <h2>Most Artifact Types</h2>
      <div className="row">
        {
          // iterate through paths.set
          // render Artifact component for each set
          counts.sortedGroups
            .slice(0, 16)
            .map((group) => (
              <button
                type="button"
                onClick={() => handleClickGroup(group)}
                alt={group}
                key={group}
              >
                <Artifact
                  piece={counts.groups[group].piece}
                  set={counts.groups[group].set}
                  mainstat={counts.groups[group].stat}
                  count={counts.groups[group].count}
                />
              </button>
            ))
        }
      </div>
    </Box>
  );
}
