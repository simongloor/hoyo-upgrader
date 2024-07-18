/* eslint-disable no-unused-vars */
import React from 'react';

import { getBuildsBySets } from '../data/characters';

import Box from './Box';
import ArtifactEvaluation from './ArtifactEvaluation';

// import '../styles/ArtifactOverview.scss';

export default function ArtifactOverview({ artifactData, characterData }) {
  const characterBuilds = getBuildsBySets(characterData);

  return (
    <Box
      className="ArtifactOverview row"
    >
      <h2>
        Artifacts
        <span className="weak">{artifactData.length}</span>
      </h2>
      {
        artifactData
          // .slice(150, 200)
          .map((artifact, i) => (
            <ArtifactEvaluation
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              data={artifact}
              characterBuilds={characterBuilds[artifact.setKey] || []}
            />
          ))
      }
    </Box>
  );
}
