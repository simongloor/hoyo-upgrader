/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch } from 'react-redux';

import { toggleArtifactSetFilter, toggleArtifactPieceFilter } from '../data/actions/filter';
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
  characterBuildSets,
  // piece
  isArtifactPiece,
  artifactPieceName = 'flower',
  filteredArtifactPiece,
}) {
  const dispatch = useDispatch();

  // event handlers
  const handleClickSet = () => {
    // console.log(`Artifact Set: ${artifactSetName}`);
    dispatch(toggleArtifactSetFilter(artifactSetName));
  };
  const handleClickSets = () => {
    console.log(`Artifact Sets: ${characterBuildSets}`);
  };
  const handleClickPiece = () => {
    // console.log(`Artifact Piece: ${artifactPieceName}`);
    dispatch(toggleArtifactPieceFilter(artifactPieceName));
  };

  // render
  return (
    <div
      className={`FilterTile tile ${isCharacter ? 'character' : ''} ${isArtifactSet ? 'artifact-set' : ''} ${isArtifactPiece ? 'artifact-piece' : ''}`}
    >
      {
        // Character filter or placeholder
        isCharacter && (
          <Character
            characterName={characterName || 'generic'}
            buildName={characterBuildName || undefined}
          />
        )
      }
      {
        // Default set filter or placeholder
        isArtifactSet && !characterBuildSets && (
          <button
            type="button"
            onClick={handleClickSet}
            alt="Filtered Artifact Set"
            disabled={!artifactSetName}
          >
            <Artifact
              piece="flower"
              set={artifactSetName || 'empty'}
            />
          </button>
        )
      }
      {
        // Character build set filter
        isArtifactSet && characterBuildSets && (
          <button
            type="button"
            onClick={handleClickSets}
            alt="Filtered Artifact Set"
          >
            <ArtifactMultiSet
              sets={characterBuildSets}
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
