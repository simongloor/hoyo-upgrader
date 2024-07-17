/* eslint-disable no-unused-vars */
import React from 'react';

import { evaluateArtifactSet } from '../data/substats';
import CharacterOverview from './CharacterOverview';
import Box from './Box';

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

  // Render
  return (
    <Box
      className="AccountOverview"
    >
      <h2>Characters</h2>
      {
        dataToDisplay.map((data) => (
          <CharacterOverview
            key={`${data.characterKey}-${data.characterBuild.build}`}
            characterName={data.characterKey}
            characterArtifacts={data.characterArtifacts}
            totalSubstats={data.totalSubstats}
          />
        ))
      }
    </Box>
  );
}
