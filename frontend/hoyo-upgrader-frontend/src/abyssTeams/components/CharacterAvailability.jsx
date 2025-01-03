/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch } from 'react-redux';

import Box from '../../components/Box';
import CharacterSelector from '../../components/CharacterSelector';
import { toggleDisabledCharacter } from '../data/actions/teams';

// import '../styles/CharacterAvailability.scss';

export default function CharacterAvailability({ disabledCharacters }) {
  const dispatch = useDispatch();

  return (
    <Box
      className="CharacterAvailability"
    >
      <h2>Characters</h2>
      <CharacterSelector
        onSelectCharacter={(characterName) => dispatch(toggleDisabledCharacter(characterName))}
        inactiveCharacters={disabledCharacters}
        // hiu
      />
    </Box>
  );
}
