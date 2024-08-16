/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import paths from '../data/paths';
import { applyFilter } from '../data/actions/filter';

import Box from './Box';
import RecommendationRow from './RecommendationRow';
import NumberButton from './NumberButton';

import iconBack from '../theme/arrow_back.svg';
import '../styles/Recommendations.scss';

export default function Recommendations({
  recommendations,
}) {
  // console.log(recommendations);
  const dispatch = useDispatch();
  const [displayedKey, setDisplayedKey] = useState('');

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
      <NumberButton
        key={recommendationKey}
        number={recommendationKey !== 'TOO_MANY' && recommendations[recommendationKey].totalCount}
        label={paths.recommendation[recommendationKey]}
        isBold={recommendationKey === 'UPGRADE100' || recommendationKey === 'MAYBE_UPGRADE_100'}
        // isSelected={displayedKey === recommendationKey}
        onClick={() => setDisplayedKey(recommendationKey)}
      />
    ));

  let activeCommand = '';
  switch (displayedKey) {
    case 'UPGRADE100':
    case 'UPGRADE75':
    case 'UPGRADE50':
      activeCommand = 'level these:';
      break;
    case 'MAYBE_UPGRADE_100':
    case 'MAYBE_UPGRADE_30':
      activeCommand = 'level these artifacts to 4:';
      break;
    case 'TOO_MANY':
    case 'NOT_NEEDED':
    case 'NO_UPGRADE':
    case 'UNDER30CHANCE_UPGRADE':
    default:
      activeCommand = 'reduce these:';
      break;
  }

  // render
  return (
    <Box
      className="Recommendations"
    >
      <h2>Build Recommendations</h2>
      {
        displayedKey === ''
          ? (
            <div className="buttons">
              <div className="filterSelection">
                <span>level these artifacts:</span>
                {
                  renderFilterButtons([
                    'UPGRADE100',
                    'UPGRADE75',
                    'UPGRADE50',
                  ])
                }
              </div>
              <div className="filterSelection">
                <span>level these artifacts to 4:</span>
                {
                  renderFilterButtons([
                    'MAYBE_UPGRADE_100',
                    'MAYBE_UPGRADE_30',
                  ])
                }
              </div>
              <div className="filterSelection">
                <span>fodder/strongbox these artifacts:</span>
                {
                  renderFilterButtons([
                    'NOT_NEEDED',
                    'NO_UPGRADE',
                    'UNDER30CHANCE_UPGRADE',
                    'TOO_MANY',
                  ])
                }
              </div>
            </div>

          ) : (
            <>
              <div className="navigationBack">
                <button
                  className="back primary"
                  type="button"
                  onClick={() => setDisplayedKey('')}
                >
                  <img src={iconBack} alt="back" />
                </button>
                <div className="activeRecommendation">
                  <span>{activeCommand}</span>
                  <NumberButton
                    number={recommendations[displayedKey].totalCount}
                    label={paths.recommendation[displayedKey]}
                    // isBold
                    isSelected
                    // onClick={() => setDisplayedKey('')}
                  />
                </div>
              </div>
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
            </>
          )
      }
    </Box>
  );
}
