/* eslint-disable no-unused-vars */
import React from 'react';

import { evaluateArtifactSet } from '../data/substats';

import CharacterOverview from './CharacterOverview';
import Box from './Box';
import Character from './Character';
import SpacerPiece from './SpacerPiece';
import TextPiece from './TextPiece';
import { getBuildKey } from '../data/actions/characters';

// import '../styles/AccountOverview.scss';

const emptyArtifactData = {
  flower: null,
  plume: null,
  sands: null,
  goblet: null,
  circlet: null,
};

export default function AccountOverview({ characterData, artifactData, equippedEvaluations }) {
  // Prepare data for rendering
  // This is required since the list can be sorted by wasted substats
  const dataToDisplay = Object.keys(artifactData).map((characterName) => (
    characterData[characterName] ? (
      characterData[characterName].map((characterBuild, iBuild) => (
        {
          characterName,
          characterBuild,
          characterArtifacts: artifactData[characterName] || { ...emptyArtifactData },
          totalSubstats: evaluateArtifactSet(equippedEvaluations, characterName, iBuild),
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
    seenCharacters[data.characterName] = true;
  });
  for (let i = dataToDisplay.length - 1; i >= 0; i -= 1) {
    if (seenCharacters[dataToDisplay[i].characterName]) {
      seenCharacters[dataToDisplay[i].characterName] = false;
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
            key={getBuildKey(data.characterBuild)}
            characterName={data.characterName}
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
