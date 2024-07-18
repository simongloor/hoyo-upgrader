/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch } from 'react-redux';

import { toggleArtifactSetFilter, toggleArtifactPieceFilter } from '../data/actions/filter';
import Character from './Character';
import Artifact from './Artifact';

import '../styles/FilterTile.scss';

export default function FilterTile({
  isCharacter,
  characterName,
  characterBuildName,
  isArtifactSet,
  artifactSetName,
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
        isCharacter && (
          <Character
            characterName={characterName || 'generic'}
            buildName={characterBuildName || undefined}
          />
        )
      }
      {
        isArtifactSet && (
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
