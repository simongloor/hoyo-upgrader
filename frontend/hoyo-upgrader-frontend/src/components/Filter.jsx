/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import paths from '../data/paths';
import { possibleStats } from '../data/substats';
import { resetFilter, toggleShowOffpieces } from '../data/actions/filter';

import FilterTileCharacterBuild from './FilterTileCharacterBuild';
import FilterTileCharacterSet from './FilterTileCharacterSet';
import FilterTileSpecificSet from './FilterTileSpecificSet';
import FilterTilePiece from './FilterTilePiece';
import FilterStats from './FilterStats';

import iconReset from '../theme/reset.svg';
import iconOffpiece from '../theme/offpiece.png';
import '../styles/Filter.scss';

export default function Filter({ onClickArtifactSets }) {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  return (
    <div
      className="Filter"
    >
      <div className="filterSection">
        <div className="buttons">
          <button
            type="button"
            onClick={() => {
              dispatch(resetFilter());
            }}
          >
            <img
              className="resetButton"
              src={iconReset}
              alt="reset"
            />
          </button>
        </div>
        <span>reset</span>
      </div>
      <div className="filterSpacer" />
      <div className="filterSection">
        <div className="buttons">
          <FilterTileCharacterBuild filter={filter} />
          <FilterTileCharacterSet filter={filter} />
        </div>
        <span>character</span>
      </div>
      <div className="filterSpacer" />
      <div className="filterSection">
        <div className="buttons">
          <FilterTileSpecificSet
            filter={filter}
            onClick={onClickArtifactSets}
          />
        </div>
        <span>set</span>
      </div>
      <div className="filterSpacer" />
      <div className="filterSection">
        <div className="buttons">
          <FilterTilePiece artifactPieceName={paths.piece.flower} filter={filter} />
          <FilterTilePiece artifactPieceName={paths.piece.plume} filter={filter} />
          <FilterTilePiece artifactPieceName={paths.piece.sands} filter={filter} />
          <FilterTilePiece artifactPieceName={paths.piece.goblet} filter={filter} />
          <FilterTilePiece artifactPieceName={paths.piece.circlet} filter={filter} />
        </div>
        <span>piece</span>
      </div>
      <div className="filterSpacer" />
      {
        filter.specificPiece && possibleStats[filter.specificPiece] && (
          <div className="filterSection">
            <div className="buttons">
              <FilterStats piece={filter.specificPiece} filter={filter} />
            </div>
            <span>main stat</span>
          </div>
        )
      }
      {
        filter.specificPiece && (
          <div className="filterSection">
            <div className="buttons">
              <button
                className={`offpiece ${filter.showOffpieces ? '' : 'filtered'}`}
                type="button"
                onClick={() => {
                  dispatch(toggleShowOffpieces());
                }}
              >
                <img src={iconOffpiece} alt="offpieces" />
              </button>
            </div>
            <span>offpieces</span>
          </div>
        )
      }
    </div>
  );
}
