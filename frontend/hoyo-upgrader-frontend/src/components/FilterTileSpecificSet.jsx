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

export default function FilterTileSpecificSet({ filter, onClick }) {
  const dispatch = useDispatch();

  // event handlers
  const handleClick = () => {
    if (filter.filterSpecificSet) {
      dispatch(toggleSpecificSetFilter(filter.specificSet));
    } else if (onClick) {
      onClick();
    }
  };

  // render
  return (
    <div
      className="FilterTile artifact-set specific"
    >
      <button
        className={filter.showOffpieces ? 'filtered' : ''}
        type="button"
        onClick={handleClick}
        alt="Filtered Artifact Set"
      >
        {
          filter.filterSpecificSet ? (
            <Artifact
              set={filter.specificSet}
              piece="flower"
            />
          ) : (
            <Artifact
              set="empty"
            />
          )
        }
      </button>
    </div>
  );
}
