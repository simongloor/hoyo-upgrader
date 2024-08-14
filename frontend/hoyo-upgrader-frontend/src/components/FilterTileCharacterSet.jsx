/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch } from 'react-redux';

import {
  toggleSpecificSetFilter,
  toggleCharacterSetsFilter,
} from '../data/actions/filter';

import Artifact from './Artifact';
import ArtifactMultiSet from './ArtifactMultiSet';

import '../styles/FilterTile.scss';

export default function FilterTileCharacterSet({ filter }) {
  const dispatch = useDispatch();

  // event handlers
  const handleClick = () => {
    dispatch(toggleCharacterSetsFilter());
    // if (filter.filterCharacterSets) {
    // } else if (filter.filterSpecificSet) {
    //   dispatch(toggleSpecificSetFilter(filter.specificSet));
    // }
  };

  // render
  return (
    <div
      className="FilterTile artifact-set character"
    >
      <button
        className={filter.filterCharacterSets ? '' : 'filtered'}
        type="button"
        onClick={handleClick}
        alt="Filtered Artifact Set"
        disabled={!filter.artifactWearer}
      >
        {
          filter.characterSets ? (
            <ArtifactMultiSet filter={filter} />
          ) : (
            <Artifact
              set="empty"
              piece="multi"
            />
          )
        }
      </button>
    </div>
  );
}
