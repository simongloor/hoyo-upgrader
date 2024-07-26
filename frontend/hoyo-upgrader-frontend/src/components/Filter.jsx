/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import paths from '../data/paths';

import FilterTileCharacterBuild from './FilterTileCharacterBuild';
import FilterTilePiece from './FilterTilePiece';
import FilterTileSet from './FilterTileSet';
import Box from './Box';
import FilterStats from './FilterStats';

import '../styles/Filter.scss';
import { toggleShowOffpieces } from '../data/actions/filter';

export default function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  return (
    <div
      className="Filter"
    >
      {
        filter.specificPiece && (
          <Box className="offpiece row">
            <button
              type="button"
              onClick={() => {
                dispatch(toggleShowOffpieces());
              }}
            >
              <span className={`stat ${!filter.showOffpieces ? 'filtered' : ''}`}>show offpieces</span>
            </button>
          </Box>
        )
      }
      <FilterStats piece={filter.specificPiece} filter={filter} />
      <Box className="row">
        <FilterTileCharacterBuild filter={filter} />
        <FilterTileSet filter={filter} />
        <FilterTilePiece artifactPieceName={paths.piece.flower} filter={filter} />
        <FilterTilePiece artifactPieceName={paths.piece.plume} filter={filter} />
        <FilterTilePiece artifactPieceName={paths.piece.sands} filter={filter} />
        <FilterTilePiece artifactPieceName={paths.piece.goblet} filter={filter} />
        <FilterTilePiece artifactPieceName={paths.piece.circlet} filter={filter} />
      </Box>
    </div>
  );
}
