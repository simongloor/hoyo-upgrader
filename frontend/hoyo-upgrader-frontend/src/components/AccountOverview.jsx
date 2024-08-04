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

function getDataToDisplay(
  artifactsByWearer,
  characterData,
) {
  return Object.keys(artifactsByWearer).map((artifactWearer) => {
    const build = characterData.find((b) => b.artifactWearer === artifactWearer);
    return build ? {
      artifactWearer,
      characterBuild: build,
      characterArtifacts: artifactsByWearer[artifactWearer],
      totalSubstats: artifactsByWearer && artifactsByWearer[artifactWearer]
        ? getCharactersTotalSubstats(artifactsByWearer[artifactWearer])
        : [],
    } : null;
  }).filter((data) => data !== null).flat();
}

export default function AccountOverview({
  characterData,
  artifactsByWearer,
}) {
  // Prepare data for rendering
  // This is required since the list can be sorted by wasted substats
  const dataToDisplay = getDataToDisplay(
    artifactsByWearer,
    characterData,
  );

  // Sort by wasted substats
  dataToDisplay.sort((a, b) => (
    b.totalSubstats.wastedSubstats - a.totalSubstats.wastedSubstats
  ));

  // Remove duplicate characters from the beginning of the list
  const seenCharacters = {};
  dataToDisplay.forEach((data) => {
    seenCharacters[data.artifactWearer] = true;
  });
  for (let i = dataToDisplay.length - 1; i >= 0; i -= 1) {
    if (seenCharacters[dataToDisplay[i].artifactWearer]) {
      seenCharacters[dataToDisplay[i].artifactWearer] = false;
    } else {
      dataToDisplay.splice(i, 1);
      i -= 1;
    }
  }

  // Render
  return (
    <Box
      className="AccountOverview"
    >
      <h2>Characters</h2>
      {
        dataToDisplay.map((data) => (
          <CharacterOverview
            key={data.artifactWearer}
            characterBuild={data.characterBuild}
            characterArtifacts={data.characterArtifacts}
            totalSubstats={data.totalSubstats}
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
