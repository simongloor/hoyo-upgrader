/* eslint-disable no-unused-vars */
import React from 'react';
import Artifact from './Artifact';
import Character from './Character';
import SpacerPiece from './SpacerPiece';
// import '../styles/ArtifactEvaluation.scss';

export default function ArtifactEvaluation({
  data,
  // characterBuild,
  // piece = 'empty',
  // set = 'generic',
  // count = -1,
  // showTier = true,
}) {
  return (
    <div
      className="ArtifactEvaluation row"
    >
      {
        data.location ? (
          <Character characterName={data.location} />
        ) : (
          <SpacerPiece size="default" />
        )
      }
      <Artifact
        data={data}
      />
    </div>
  );
}
