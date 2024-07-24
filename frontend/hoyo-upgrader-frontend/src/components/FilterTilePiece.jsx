/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch } from 'react-redux';

import {
  toggleSpecificPieceFilter,
} from '../data/actions/filter';
import Artifact from './Artifact';

import '../styles/FilterTile.scss';

export default function FilterTilePiece({ filter, artifactPieceName = 'flower' }) {
  const dispatch = useDispatch();
  return (
    <div
      className="FilterTile artifact-piece"
    >
      <button
        className={filter.filteredArtifactPiece && filter.filteredArtifactPiece !== artifactPieceName ? 'filtered' : ''}
        type="button"
        onClick={() => dispatch(toggleSpecificPieceFilter(artifactPieceName))}
        alt="Filtered Artifact Piece"
      >
        <Artifact
          piece={artifactPieceName}
          set="generic"
        />
      </button>
    </div>
  );
}
