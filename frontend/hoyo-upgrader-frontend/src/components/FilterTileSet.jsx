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

export default function FilterTileSet({ filter }) {
  const dispatch = useDispatch();

  // event handlers
  const handleClick = () => {
    if (filter.filterCharacterSets) {
      dispatch(toggleCharacterSetsFilter());
    } else if (filter.filterSpecificSet) {
      dispatch(toggleSpecificSetFilter(filter.specificSet));
    }
  };

  // render
  return (
    <div
      className={`FilterTile artifact-set ${filter.filterSpecificSet ? 'specific' : ''} ${filter.filterCharacterSets ? 'character' : ''}`}
    >
      <button
        type="button"
        onClick={handleClick}
        alt="Filtered Artifact Set"
        disabled={!filter.filterCharacterSets && !filter.filterSpecificSet} // can only be disabled
      >
        {
          filter.filterCharacterSets && (
            <ArtifactMultiSet filter={filter} />
          )
        }
        {
          filter.filterSpecificSet && (
            <Artifact
              set={filter.specificSet}
              piece="flower"
            />
          )
        }
        {
          !filter.filterCharacterSets && !filter.filterSpecificSet && (
            <Artifact
              set="empty"
            />
          )
        }
      </button>
    </div>
  );
}