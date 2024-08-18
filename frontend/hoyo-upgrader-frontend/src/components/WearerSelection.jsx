/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import { getBusyArtifactWearers } from '../data/builds';
import paths from '../data/paths';

import CharacterSelector from './CharacterSelector';
import { CharacterIcon } from './Character';

import '../styles/WearerSelection.scss';

export default function WearerSelection({
  artifactWearer,
  buildOwner,
  wearerStates,
  onSelectWearer,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenSelector = () => {
    setIsOpen(true);
  };
  const handleSelectWearer = (newWearer) => {
    if (onSelectWearer) {
      onSelectWearer(newWearer);
    }
    setIsOpen(false);
  };

  if (isOpen) {
    return (
      <CharacterSelector
        selectedCharacter={artifactWearer}
        disabledCharacters={getBusyArtifactWearers(wearerStates, artifactWearer)}
        onClick={handleSelectWearer}
      />
    );
  }

  return (
    <button
      className="WearerSelection primary"
      onClick={handleOpenSelector}
      type="button"
    >
      <CharacterIcon
        character={artifactWearer}
        secondaryCharacter={buildOwner}
      />
      <span>
        <strong>{paths.character[artifactWearer]}</strong>
        {
          buildOwner !== artifactWearer
            ? ` wears ${paths.character[buildOwner]}'s artifacts.`
            : ' wears their own artifacts.'
        }
      </span>
    </button>
  );
}
