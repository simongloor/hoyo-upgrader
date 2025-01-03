/* eslint-disable no-unused-vars */
import React from 'react';

import paths from '../data/paths';

import Character from './Character';
import '../styles/CharacterSelector.scss';
import { characterData } from '../data/characters';

export default function CharacterSelector({
  selectedCharacter,
  inactiveCharacters = [],
  disabledCharacters = [],
  onSelectCharacter,
}) {
  // console.log(inactiveCharacters);
  const handleClick = (characterName) => {
    if (onSelectCharacter) {
      onSelectCharacter(characterName);
    }
  };

  return (
    <div
      className="CharacterSelector"
    >
      {
        Object.keys(characterData).map((characterName) => (
          <Character
            key={characterName}
            character={characterName}
            onClick={() => handleClick(characterName)}
            selected={selectedCharacter === characterName}
            inactive={
              inactiveCharacters.includes(characterName)
              && selectedCharacter !== characterName
            }
            disabled={
              disabledCharacters.includes(characterName)
              && selectedCharacter !== characterName
            }
          />
        ))
      }
    </div>
  );
}
