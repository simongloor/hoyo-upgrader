/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getBuildsBySets } from '../data/characters';
import { getArtifactQualitySortValue } from '../data/evaluation';

import Box from './Box';
import ArtifactEvaluation from './ArtifactEvaluation';
import Artifact from './Artifact';
import SpacerPiece from './SpacerPiece';
import TextPiece from './TextPiece';
import togglePinnedArtifact from '../data/actions/pinboard';

// import '../styles/ArtifactOverview.scss';

export default function ArtifactOverview({
  artifactsAsList,
}) {
  // console.log(artifactsAsList);
  const dispatch = useDispatch();

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
        <span className="weak">{artifactsAsList.length}</span>
      </h2>
      {
        artifactsAsList
          .map((data, i) => (
            <ArtifactEvaluation
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              artifact={data}
              handleClickPinArtifact={handleClickPinArtifact}
            />
          ))
      }
      {
        // placeholder
        artifactsAsList.length === 0 && (
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
