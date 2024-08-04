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

export default function AccountOverview({
  characterData,
  artifactDataByWearer,
  relevantSubstatsByWearer,
}) {
  // console.log(artifactDataByWearer, relevantSubstatsByWearer);
  // Prepare data for rendering
  // This is required since the list can be sorted by wasted substats
  const dataToDisplay = Object.keys(artifactDataByWearer).map((artifactWearer) => {
    const build = characterData.find((b) => b.artifactWearer === artifactWearer);
    return build ? {
      artifactWearer,
      characterBuild: build,
      characterArtifacts: {
        artifactData: artifactDataByWearer[artifactWearer],
        usedSubstats: relevantSubstatsByWearer[artifactWearer],
        tier: Object.keys(artifactDataByWearer[artifactWearer]).reduce((acc, slot) => ({
          ...acc,
          [slot]: getArtifactTier(
            artifactDataByWearer[artifactWearer][slot],
            relevantSubstatsByWearer[artifactWearer][slot],
          ),
        }), {}),
      },
      totalSubstats: relevantSubstatsByWearer && relevantSubstatsByWearer[artifactWearer]
        ? getCharactersTotalSubstats(relevantSubstatsByWearer[artifactWearer])
        : [],
    } : null;
  }).filter((data) => data !== null).flat();

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
