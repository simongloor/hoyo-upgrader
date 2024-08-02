/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch } from 'react-redux';

import paths from '../data/paths';
import { applyFilter } from '../data/actions/filter';

import Artifact from './Artifact';
import Box from './Box';
import ArtifactMultiSet from './ArtifactMultiSet';
import SpacerPiece from './SpacerPiece';
import '../styles/Recommendations.scss';

export default function Recommendations({ counts }) {
  const dispatch = useDispatch();
  // event handlers
  const handleClickGroup = (group) => {
    const {
      set,
      piece,
      stat,
      offpieces,
    } = counts.groups[group];
    const setIsValid = Object.keys(paths.set).includes(set);
    dispatch(applyFilter({
      specificPiece: piece,
      filterSpecificSet: setIsValid,
      specificSet: setIsValid ? set : null,
      mainstat: {
        sands: piece === 'sands' ? stat : null,
        goblet: piece === 'goblet' ? stat : null,
        circlet: piece === 'circlet' ? stat : null,
      },
      showOffpieces: offpieces,
    }));
  };
  return (
    <Box
      className="Recommendations"
    >
      <h2>Recommendations</h2>
      <span>Work on these types of artifacts:</span>
      <div className="row">
        {
          // iterate through paths.set
          // render Artifact component for each set
          counts.sortedGroups
            .slice(0, 16)
            .map((group) => (
              <button
                type="button"
                onClick={() => handleClickGroup(group)}
                alt={group}
                key={group}
              >
                <Artifact
                  piece={counts.groups[group].piece}
                  set={counts.groups[group].set}
                  mainstat={counts.groups[group].stat}
                  count={counts.groups[group].count}
                />
              </button>
            ))
        }
      </div>
    </Box>
  );
}
