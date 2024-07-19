/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch } from 'react-redux';

import { toggleArtifactSetFilter, toggleArtifactPieceFilter, toggleArtifactSetsFilter } from '../data/actions/filter';
import Character from './Character';
import Artifact from './Artifact';

import '../styles/FilterTile.scss';
import ArtifactMultiSet from './ArtifactMultiSet';

export default function FilterTile({
  // character
  isCharacter,
  characterName,
  characterBuildName,
  // set
  isArtifactSet,
  artifactSetName,
  artifactSetNames,
  // piece
  isArtifactPiece,
  artifactPieceName = 'flower',
  filteredArtifactPiece,
}) {
  const dispatch = useDispatch();

  // event handlers
  const handleClickSets = () => {
    // console.log(`Artifact Set: ${artifactSetName}`);
    dispatch(toggleArtifactSetsFilter(artifactSetNames));
  };
  const handleClickPiece = () => {
    // console.log(`Artifact Piece: ${artifactPieceName}`);
    dispatch(toggleArtifactPieceFilter(artifactPieceName));
  };

  // render
  return (
    <div
      className={`FilterTile ${isCharacter ? 'character' : ''} ${isArtifactSet ? 'artifact-set' : ''} ${isArtifactPiece ? 'artifact-piece' : ''}`}
    >
      {
        // Character filter or placeholder
        isCharacter && (
          <Character
            characterName={characterName || 'generic'}
            buildName={characterBuildName || undefined}
            sets={artifactSetNames}
          />
        )
      }
      {
        // Character build set filter
        isArtifactSet && (
          <button
            type="button"
            onClick={handleClickSets}
            alt="Filtered Artifact Set"
            disabled={!artifactSetNames}
          >
            <ArtifactMultiSet
              sets={artifactSetNames}
            />
          </button>
        )
      }
      {
        // Character build set filter
        isArtifactPiece && (
          <button
            className={filteredArtifactPiece && filteredArtifactPiece !== artifactPieceName ? 'filtered' : ''}
            type="button"
            onClick={handleClickPiece}
            alt="Filtered Artifact Piece"
          >
            <Artifact
              piece={artifactPieceName}
              set="generic"
            />
          </button>
        )
      }
    </div>
  );
}
