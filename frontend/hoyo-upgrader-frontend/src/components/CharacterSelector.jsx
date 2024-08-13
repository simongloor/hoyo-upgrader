/* eslint-disable no-unused-vars */
import React from 'react';

import paths from '../data/paths';

import Character from './Character';
import '../styles/CharacterSelector.scss';

export default function CharacterSelector({
  selectedCharacter,
  inactiveCharacters = [],
  disabledCharacters = [],
  onClick,
}) {
  // console.log(inactiveCharacters);
  return (
    <div
      className="CharacterSelector"
    >
      {
        Object.keys(paths.character).map((characterName) => (
          <Character
            key={characterName}
            character={characterName}
            onClick={() => onClick(characterName)}
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
