/* eslint-disable no-unused-vars */
import React from 'react';

import { getCharactersTotalSubstats } from '../data/substats';

import CharacterOverview from './CharacterOverview';
import Box from './Box';
import Character from './Character';
import SpacerPiece from './SpacerPiece';
import TextPiece from './TextPiece';

import '../styles/AccountOverview.scss';
import { getArtifactTier } from '../data/evaluation';
import { getEquippedArtifacts } from '../data/builds';

function getDataToDisplay(
  filteredBuilds,
  artifactsAsList,
) {
  return filteredBuilds.map((build) => {
    const artifacts = getEquippedArtifacts(build.artifactWearer, artifactsAsList);
    const relevantSubstats = getCharactersTotalSubstats(build.artifactWearer, artifacts);
    return {
      build,
      artifacts,
      relevantSubstats,
    };
  }).sort((a, b) => (
    b.relevantSubstats.wastedSubstats - a.relevantSubstats.wastedSubstats
  ));
}

export default function AccountOverview({
  filteredBuilds,
  artifactsAsList,
}) {
  // Prepare data for rendering
  // This is required since the list can be sorted by wasted substats
  const dataToDisplay = getDataToDisplay(
    filteredBuilds,
    artifactsAsList,
  );

  // Render
  return (
    <Box
      className="AccountOverview"
    >
      <h2>Characters</h2>
      {
        dataToDisplay.map((data) => (
          <CharacterOverview
            key={data.build.artifactWearer}
            characterBuild={data.build}
            characterArtifacts={data.artifacts}
            relevantSubstats={data.relevantSubstats}
          />
        ))
      }
      {
        dataToDisplay.length === 0 && (
          <div className="row placeholder">
            <Character />
            <SpacerPiece />
            <TextPiece canOverflow>No matching character found</TextPiece>
            <SpacerPiece />
          </div>
        )
      }
    </Box>
  );
}
