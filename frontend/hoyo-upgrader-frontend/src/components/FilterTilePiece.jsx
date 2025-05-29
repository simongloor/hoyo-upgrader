/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch } from 'react-redux';

import {
  toggleSpecificPieceFilter,
} from '../data/actions/filter';

import '../styles/FilterTile.scss';
import StatNeeds from './StatNeeds';

export default function FilterTilePiece({
  filter,
  artifactPieceName = 'flower',
  mainstats,
  substats,
}) {
  const dispatch = useDispatch();

  return (
    <div
      className="FilterTile artifact-piece"
    >
      <button
        type="button"
        onClick={() => dispatch(toggleSpecificPieceFilter(artifactPieceName))}
        alt="Filtered Artifact Piece"
      >
        <StatNeeds
          artifactPieceName={artifactPieceName}
          mainstats={mainstats}
          substats={substats}
          displayActive={!filter.specificPiece || filter.specificPiece === artifactPieceName}
        />
      </button>
    </div>
  );
}
