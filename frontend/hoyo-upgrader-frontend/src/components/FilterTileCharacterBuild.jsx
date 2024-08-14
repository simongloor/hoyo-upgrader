/* eslint-disable no-unused-vars */
import React from 'react';

import Character from './Character';

import '../styles/FilterTile.scss';

export default function FilterTileCharacterBuild({ filter }) {
  return (
    <div
      className={`FilterTile character ${filter.artifactWearer ? 'active' : 'placeholder'}`}
    >
      <Character
        className={filter.artifactWearer ? '' : 'filtered'}
        character={filter.artifactWearer || 'generic'}
        secondaryCharacter={filter.buildOwner}
        sets={filter.characterSets}
        disabled={!filter.artifactWearer}
      />
    </div>
  );
}
