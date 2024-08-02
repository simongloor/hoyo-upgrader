/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import paths from '../data/paths';

import Artifact from './Artifact';
import Box from './Box';
import ArtifactMultiSet from './ArtifactMultiSet';
import SpacerPiece from './SpacerPiece';
import {
  toggleCharacterSetsFilter,
  toggleSpecificSetFilter,
} from '../data/actions/filter';

import '../styles/ArtifactInventory.scss';

export default function ArtifactInventory({ counts }) {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  // event handlers
  const handleClickSpecificSet = (set) => {
    // console.log(`Artifact Set: ${set}`);
    dispatch(toggleSpecificSetFilter(set));
  };
  const handleClickCharacterSets = () => {
    // console.log('Character Sets');
    dispatch(toggleCharacterSetsFilter());
  };

  // render
  return (
    <Box
      className="ArtifactInventory"
    >
      <h2>Sets</h2>
      <div className="row">
        <button
          className={`button ${
            filter.filterCharacterSets // active filter should be highlighted
            || !filter.characterSets // no sets should also be left at default
              ? '' : 'filtered'
          }`}
          type="button"
          onClick={() => handleClickCharacterSets()}
          alt="Filtered Character Artifact Sets"
          disabled={!filter.characterName}
        >
          <ArtifactMultiSet filter={filter} />
        </button>
        <SpacerPiece />
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
                onClick={() => handleClickSpecificSet(set)}
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
