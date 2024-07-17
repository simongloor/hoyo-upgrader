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
        // go through character keys
        Object.keys(artifactData).map((characterKey) => (
          <CharacterOverview
            key={characterKey}
            characterName={characterKey}
            characterData={characterData[characterKey]}
            artifactData={artifactData[characterKey]}
          />
        ))
      }
    </Box>
  );
}
