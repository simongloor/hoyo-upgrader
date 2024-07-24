/* eslint-disable no-unused-vars */
import React from 'react';

import { evaluateArtifactSet } from '../data/substats';

import CharacterOverview from './CharacterOverview';
import Box from './Box';
import Character from './Character';
import SpacerPiece from './SpacerPiece';
import TextPiece from './TextPiece';

// import '../styles/AccountOverview.scss';

export default function AccountOverview({ characterData, artifactData }) {
  // Prepare data for rendering
  // This is required since the list can be sorted by wasted substats
  const dataToDisplay = Object.keys(artifactData).map((characterKey) => (
    characterData[characterKey] ? (
      characterData[characterKey].map((characterBuild) => (
        {
          characterKey,
          characterBuild,
          characterArtifacts: artifactData[characterKey],
          totalSubstats: evaluateArtifactSet(artifactData[characterKey], characterBuild),
        }
      ))
    ) : null
  )).filter((data) => data !== null).flat();

  // Sort by wasted substats
  dataToDisplay.sort((a, b) => (
    b.totalSubstats.wastedSubstats - a.totalSubstats.wastedSubstats
  ));

  // Remove duplicate characters from the beginning of the list
  const seenCharacters = {};
  dataToDisplay.forEach((data) => {
    seenCharacters[data.characterKey] = true;
  });
  for (let i = dataToDisplay.length - 1; i >= 0; i -= 1) {
    if (seenCharacters[dataToDisplay[i].characterKey]) {
      seenCharacters[dataToDisplay[i].characterKey] = false;
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
            key={`${data.characterKey}-${data.characterBuild.substats.join('-')}`}
            characterName={data.characterKey}
            characterBuild={data.characterBuild}
            characterArtifacts={data.characterArtifacts}
            totalSubstats={data.totalSubstats}
          />
        ))
      }
      {
        dataToDisplay.length === 0 && (
          <div className="row">
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
