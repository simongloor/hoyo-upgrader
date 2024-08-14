/* eslint-disable no-unused-vars */
import React, { Profiler } from 'react';
import { useSelector } from 'react-redux';

import paths from '../data/paths';

import Artifact from './Artifact';
import Box from './Box';

import '../styles/ArtifactInventory.scss';

export default function ArtifactInventory({ counts, onClickSet }) {
  const filter = useSelector((state) => state.filter);

  // render
  return (
    <Box
      className="ArtifactInventory"
    >
      <div className="row">
        {
          // iterate through paths.set
          // render Artifact component for each set
          counts.sortedSets
            .filter((set) => Object.keys(paths.set).includes(set)) // ensure set is known
            .map((set) => (
              <button
                className={`button ${
                  (!filter.filterSpecificSet && !filter.filterCharacterSets)
                  || (filter.filterCharacterSets
                    && filter.characterSets && filter.characterSets.includes(set))
                  || (filter.filterSpecificSet
                    && filter.specificSet === set)
                    ? '' : 'filtered'
                }`}
                type="button"
                onClick={() => onClickSet && onClickSet(set)}
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
