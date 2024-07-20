/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import paths from '../data/paths';

import Artifact from './Artifact';
import Box from './Box';
import { toggleArtifactSetsFilter } from '../data/actions/filter';

import '../styles/ArtifactInventory.scss';
import ArtifactMultiSet from './ArtifactMultiSet';

export default function ArtifactInventory({ counts }) {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  // event handlers
  const handleClickSet = (sets) => {
    // console.log(`Artifact Set: ${set}`);
    dispatch(toggleArtifactSetsFilter(sets));
  };

  // render
  return (
    <Box
      className="ArtifactInventory"
    >
      <h2>Sets</h2>
      <div className="row">
        {
          filter.characterSets && (
            <button
              type="button"
              onClick={() => handleClickSet(filter.characterSets)}
              alt="Filtered Artifact Set"
            >
              <ArtifactMultiSet
                characterFilter={filter.character}
                characterSets={filter.characterSets}
                buildFilterEnabled={filter.buildFilterEnabled}
              />
            </button>
          )
        }
        {
          // iterate through paths.set
          // render Artifact component for each set
          counts.sortedSets
            .filter((set) => Object.keys(paths.set).includes(set))
            .map((set) => (
              <button
                className={`button ${filter.sets && !filter.sets.includes(set) ? 'filtered' : ''}`}
                type="button"
                onClick={() => handleClickSet([set])}
                alt={set}
                key={set}
              >
                <Artifact
                  piece={paths.piece.flower}
                  set={set}
                  count={counts.sets[set] ? counts.sets[set].total : 0}
                />
              </button>
            ))
        }
      </div>
    </Box>
  );
}
