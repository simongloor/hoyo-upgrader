/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch } from 'react-redux';

import {
  toggleSpecificPieceFilter,
} from '../data/actions/filter';
import Artifact from './Artifact';

import '../styles/FilterTile.scss';

export default function FilterTilePiece({
  filter,
  artifactPieceName = 'flower',
  mainstats,
  substats,
}) {
  const dispatch = useDispatch();
  const filteredSubstats = mainstats
    ? substats.filter((stat) => !mainstats.includes(stat))
    : substats;

  const renderStats = (statType, stats) => (
    <div className={`${statType} stats ${artifactPieceName === 'flower' && 'stretch'}`}>
      {
        stats.map((stat) => (
          <div key={stat} className={`stat ${stat}`} />
        ))
      }
    </div>
  );

  return (
    <div
      className="FilterTile artifact-piece"
    >
      <button
        type="button"
        onClick={() => dispatch(toggleSpecificPieceFilter(artifactPieceName))}
        alt="Filtered Artifact Piece"
      >
        { mainstats && renderStats('main', mainstats) }
        { substats && renderStats('sub', filteredSubstats) }
        <Artifact
          className={filter.specificPiece && filter.specificPiece !== artifactPieceName ? 'filtered' : ''}
          piece={artifactPieceName}
          set="generic"
        />
      </button>
    </div>
  );
}
