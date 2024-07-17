/* eslint-disable no-unused-vars */
import React from 'react';

import Box from './Box';
import Artifact from './Artifact';
import ArtifactEvaluation from './ArtifactEvaluation';

// import '../styles/ArtifactOverview.scss';

export default function ArtifactOverview({ artifactData }) {
  return (
    <Box
      className="ArtifactOverview row"
    >
      <h2>Artifacts</h2>
      {
        artifactData.map((artifact, i) => (
          <ArtifactEvaluation
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            data={artifact}
          />
        ))
      }
    </Box>
  );
}
