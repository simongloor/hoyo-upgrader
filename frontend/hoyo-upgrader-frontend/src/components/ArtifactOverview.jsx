/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import paths from '../data/paths';
import { getBuildsBySets, getBuildsCompact } from '../data/characters';
import { evaluateArtifact, getArtifactQualitySortValue, getBuildQualitySortValue } from '../data/substats';

import Box from './Box';
import ArtifactEvaluation from './ArtifactEvaluation';
import Artifact from './Artifact';
import SpacerPiece from './SpacerPiece';
import TextPiece from './TextPiece';
import togglePinnedArtifact from '../data/actions/pinboard';

// import '../styles/ArtifactOverview.scss';

function getArtifactEvaluations(
  artifactData,
  characterBuilds,
  characterArtifacts,
  filteredCharacter,
) {
  // get matching builds
  let matchingBuilds = [];
  if (artifactData.slotKey === paths.piece.flower || artifactData.slotKey === paths.piece.plume) {
    // flower and plume can be used by any character
    matchingBuilds = characterBuilds;
  } else {
    // if no main stat is set, show all builds that can use the artifact
    matchingBuilds = characterBuilds.filter((build) => (
      build.mainstats[artifactData.slotKey].includes(artifactData.mainStatKey)
    ));
  }

  // generate data required for rendering
  return {
    artifactData,
    buildEvaluations: matchingBuilds.map((build) => {
      const totalSubstats = evaluateArtifact(artifactData, build);
      let competingArtifact = null;
      if (characterArtifacts[build.characterName]) {
        competingArtifact = characterArtifacts[build.characterName][artifactData.slotKey];
      }
      return {
        build,
        totalSubstats,
        competingArtifact,
        sortValue: getBuildQualitySortValue(build, totalSubstats, filteredCharacter),
      };
    }).sort((a, b) => (a.sortValue - b.sortValue)),
  };
}

export default function ArtifactOverview({ artifactData, characterData }) {
  const dispatch = useDispatch();
  const artifactsByCharacter = useSelector((state) => state.artifacts.byCharacter);

  const characterBuildsBySet = getBuildsBySets(characterData);
  const allCharacterBuilds = getBuildsCompact(characterData);
  const filter = useSelector((state) => state.filter);

  // generate artifact evaluation data
  // this is required to sort the artifacts by quality
  const evaluationData = artifactData
    .slice(150, 200)
    .map((artifact) => (
      getArtifactEvaluations(
        artifact,
        filter.showOffpieces
          ? allCharacterBuilds
          : characterBuildsBySet[artifact.setKey] || [],
        artifactsByCharacter,
        filter.characterName,
      )
    ))
    // sort artifacts by quality
    .sort((a, b) => (
      getArtifactQualitySortValue(a, filter.characterName)
        - getArtifactQualitySortValue(b, filter.characterName)
    ));
  // console.log(evaluationData);

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
