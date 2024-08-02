/* eslint-disable no-unused-vars */
import React from 'react';

import Character from './Character';

import '../styles/FilterTile.scss';

export default function FilterTileCharacterBuild({ filter }) {
  return (
    <div
      className={`FilterTile character ${filter.characterName ? 'active' : 'placeholder'}`}
    >
      <Character
        characterName={filter.characterName || 'generic'}
        sets={filter.characterSets}
      />
    </div>
  );
}
