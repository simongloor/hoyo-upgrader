/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getBuildsBySets } from '../data/characters';
import { getArtifactEvaluations, getArtifactQualitySortValue } from '../data/substats';

import Box from './Box';
import ArtifactEvaluation from './ArtifactEvaluation';
import Artifact from './Artifact';
import SpacerPiece from './SpacerPiece';
import TextPiece from './TextPiece';
import togglePinnedArtifact from '../data/actions/pinboard';

// import '../styles/ArtifactOverview.scss';

export default function ArtifactOverview({
  artifactData,
  characterData,
  equippedEvaluations,
}) {
  // console.log(equippedEvaluations);
  const dispatch = useDispatch();

  const characterBuildsBySet = getBuildsBySets(characterData);
  const filter = useSelector((state) => state.filter);

  // generate artifact evaluation data
  // this is required to sort the artifacts by quality
  const evaluationData = artifactData
    // .slice(200, 250)
    .map((artifact) => (
      getArtifactEvaluations(
        artifact,
        filter.showOffpieces
          ? characterData
          : characterBuildsBySet[artifact.setKey] || [],
        equippedEvaluations,
        filter.characterName,
      )
    ))
    // sort artifacts by quality
    .sort((a, b) => (
      getArtifactQualitySortValue(a, filter.characterName)
        - getArtifactQualitySortValue(b, filter.characterName)
    ));

  // handle pinning artifact
  const handleClickPinArtifact = (pinnedArtifactData) => {
    dispatch(togglePinnedArtifact(pinnedArtifactData));
  };

  // render
  return (
    <Box
      className="ArtifactOverview"
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
              handleClickPinArtifact={handleClickPinArtifact}
              filteredCharacter={filter.characterName}
            />
          ))
      }
      {
        // placeholder
        artifactData.length === 0 && (
          <div className="row">
            <Artifact set="empty" />
            <SpacerPiece />
            <TextPiece canOverflow>No matching artifact found</TextPiece>
            <SpacerPiece />
          </div>
        )
      }
    </Box>
  );
}
