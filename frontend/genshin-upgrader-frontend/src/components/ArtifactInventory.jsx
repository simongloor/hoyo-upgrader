/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch } from 'react-redux';

import paths from '../data/paths';

import Artifact from './Artifact';
import Box from './Box';
import { toggleArtifactSetFilter } from '../data/actions/filter';

// import '../styles/ArtifactInventory.scss';

export default function ArtifactInventory({ counts }) {
  const dispatch = useDispatch();

  // event handlers
  const handleClickSet = (set) => {
    // console.log(`Artifact Set: ${set}`);
    dispatch(toggleArtifactSetFilter(set));
  };

  // render
  return (
    <Box
      className="ArtifactInventory"
    >
      <h2>Sets</h2>
      <div className="row">
        {
          // iterate through paths.set
          // render Artifact component for each set
          counts.sortedSets
            .filter((set) => Object.keys(paths.set).includes(set))
            .map((set) => (
              <button
                type="button"
                onClick={() => handleClickSet(set)}
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
