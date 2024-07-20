/* eslint-disable no-unused-vars */
import React from 'react';

import Character from './Character';

import '../styles/FilterTile.scss';

export default function FilterTileCharacterBuild({ filter }) {
  return (
    <div
      className="FilterTile character"
    >
      <Character
        characterName={filter.characterName || 'generic'}
        buildName={filter.characterBuildName || undefined}
        sets={filter.characterSets}
      />
    </div>
  );
}
