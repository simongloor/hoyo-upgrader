/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import paths from '../data/paths';
import { applyFilter } from '../data/actions/filter';

import Box from './Box';
import RecommendationRow from './RecommendationRow';
import '../styles/Recommendations.scss';

export default function Recommendations({
  recommendations,
}) {
  // console.log(recommendations);
  const dispatch = useDispatch();
  const [displayedKey, setDisplayedKey] = useState('TOO_MANY');

  // event handlers
  const handleClickGroup = (group) => {
    const {
      set,
      piece,
      stat,
      offpieces,
      filterStrings,
    } = recommendations[displayedKey].groups[group];

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
      highlightArtifactKeys: filterStrings,
    }));
  };

  // render buttons for all recommendation keys
  const renderFilterButtons = (recommendationKeys) => recommendationKeys
    .map((recommendationKey) => (
      <button
        className={`primary ${displayedKey === recommendationKey ? 'selected' : ''}`}
        type="button"
        onClick={() => setDisplayedKey(recommendationKey)}
        key={recommendationKey}
      >
        <span>
          {
            recommendationKey === 'TOO_MANY'
              ? paths.recommendation[recommendationKey]
              : `${paths.recommendation[recommendationKey]} (${recommendations[recommendationKey].totalCount})`
          }
        </span>
      </button>
    ));

  // render
  return (
    <Box
      className="Recommendations"
    >
      <h2>Build Recommendations</h2>
      <div className="filterSelection row">
        <span>level these:</span>
        {
          renderFilterButtons([
            'UPGRADE100',
            'UPGRADE75',
            'UPGRADE50',
          ])
        }
      </div>
      <div className="filterSelection row">
        <span>bring to lvl 4:</span>
      </div>
      <div className="filterSelection row">
        <span>reduce these:</span>
        {
          renderFilterButtons([
            'NOT_NEEDED',
            'NO_UPGRADE',
            'UNDER30CHANCE_UPGRADE',
            'TOO_MANY',
          ])
        }
      </div>
      <span>
        These types of artifacts (hydro goblets, emblem flowers, etc.)
        have many Artifacts that match the criteria:
      </span>
      <div className="artifactGroups">
        {
          // render rows for displayed recommendation key
          Object.keys(paths.piece).map((piece) => (
            <RecommendationRow
              key={piece}
              set={piece}
              data={recommendations[displayedKey]}
              onClick={handleClickGroup}
            />
          ))
        }
      </div>
    </Box>
  );
}
