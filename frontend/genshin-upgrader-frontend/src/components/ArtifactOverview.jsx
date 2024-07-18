/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';

import paths from '../data/paths';
import { getBuildsBySets } from '../data/characters';
import { evaluateArtifact } from '../data/substats';

import Box from './Box';
import ArtifactEvaluation from './ArtifactEvaluation';
import Artifact from './Artifact';
import SpacerPiece from './SpacerPiece';
import TextPiece from './TextPiece';

// import '../styles/ArtifactOverview.scss';

function getArtifactEvaluations(artifactData, characterBuilds) {
  // get matching builds
  let matchingBuilds = [];
  if (artifactData.slotKey === paths.piece.flower || artifactData.slotKey === paths.piece.plume) {
    matchingBuilds = characterBuilds;
  } else {
    matchingBuilds = characterBuilds.filter((build) => (
      build.mainstats[artifactData.slotKey].includes(artifactData.mainStatKey)
    ));
  }

  // generate data required for rendering
  return {
    artifactData,
    buildEvaluations: matchingBuilds.map((build) => (
      {
        build,
        totalSubstats: evaluateArtifact(artifactData, build),
      }
    )),
  };
}

export default function ArtifactOverview({ artifactData, characterData }) {
  const characterBuilds = getBuildsBySets(characterData);
  const filter = useSelector((state) => state.filter);

  // generate artifact evaluation data
  // this is required to sort the artifacts by quality
  const evaluationData = artifactData
    // .slice(150, 200)
    .map((artifact) => (
      getArtifactEvaluations(artifact, characterBuilds[artifact.setKey] || [])
    ));

  // render
  return (
    <Box
      className="ArtifactOverview row"
    >
      <h2>
        Artifacts
        <span className="weak">{artifactData.length}</span>
      </h2>
      {
        evaluationData
          .map((data, i) => (
            <ArtifactEvaluation
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              evaluationData={data}
              filteredCharacter={filter.character}
            />
          ))
      }
      {
        // placeholder
        artifactData.length === 0 && (
          <div className="row">
            <Artifact set="empty" piece="flower" />
            <SpacerPiece />
            <TextPiece canOverflow>No matching artifact found</TextPiece>
            <SpacerPiece />
          </div>
        )
      }
    </Box>
  );
}
