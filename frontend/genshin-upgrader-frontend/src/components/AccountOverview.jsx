/* eslint-disable no-unused-vars */
import React from 'react';

import CharacterOverview from './CharacterOverview';
import Box from './Box';

// import '../styles/AccountOverview.scss';

export default function AccountOverview({ characterData, artifactData }) {
  return (
    <Box
      className="AccountOverview"
    >
      <h2>Characters</h2>
      {
        Object.keys(artifactData).map((characterKey) => (
          characterData[characterKey] ? (
            characterData[characterKey].map((characterBuild) => (
              <CharacterOverview
                key={`${characterKey}-${characterBuild.build}`}
                characterName={characterKey}
                characterBuild={characterBuild}
                characterArtifacts={artifactData[characterKey]}
              />
            ))
          ) : null
        ))
      }
    </Box>
  );
}
