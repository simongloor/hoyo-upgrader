/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from './Box';
import ArtifactEvaluation from './ArtifactEvaluation';
import Artifact from './Artifact';
import SpacerPiece from './SpacerPiece';
import togglePinnedArtifact from '../data/actions/pinboard';

import '../styles/ArtifactOverview.scss';

export default function ArtifactOverview({
  artifactsAsList,
}) {
  // console.log(artifactsAsList);
  const dispatch = useDispatch();
  const { pinnedArtifactData } = useSelector((state) => state.pinboard);
  const pinnedArtifactString = pinnedArtifactData ? JSON.stringify(pinnedArtifactData.substats) : '';

  // handle pinning artifact
  const handleClickPinArtifact = (artifactData) => {
    dispatch(togglePinnedArtifact(artifactData));
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
              pinnedArtifactString={pinnedArtifactString}
            />
          ))
      }
      {
        // placeholder
        artifactsAsList.length === 0 && (
          <div className="placeholder row">
            <Artifact set="empty" />
            <SpacerPiece />
            <span>No matching artifact found</span>
            <SpacerPiece />
          </div>
        )
      }
    </Box>
  );
}
