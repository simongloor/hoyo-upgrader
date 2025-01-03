/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-unused-vars */
import React from 'react';
import Box from '../Box';
import CharacterSelector from '../CharacterSelector';
// import '../styles/CharacterAvailability.scss';

export default function CharacterAvailability({ children }) {
  return (
    <Box
      className="CharacterAvailability"
    >
      <h2>Characters</h2>
      <CharacterSelector
        // hiu
      />
    </Box>
  );
}
