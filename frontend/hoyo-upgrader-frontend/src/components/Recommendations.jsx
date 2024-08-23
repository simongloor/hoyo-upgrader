/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import paths from '../data/paths';
import { applyFilter } from '../data/actions/filter';

import Box from './Box';
import RecommendationRow from './RecommendationRow';
import NumberButton from './NumberButton';

import iconBack from '../theme/arrow_back.svg';
import iconChevronDown from '../theme/chevron_down.svg';
import iconChevronUp from '../theme/chevron_up.svg';
import '../styles/Recommendations.scss';

export default function Recommendations({
  recommendations,
}) {
  // console.log(recommendations);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [displayedKey, setDisplayedKey] = useState('');

  if (!recommendations) {
    return null;
  }

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
        number={recommendations[recommendationKey].totalCount}
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
    case 'TOO_MANY_FOR_BUILDS':
    case 'NOT_UPGRADE_OFFPIECE':
    case 'NO_UPGRADE':
    case 'NO_UPGRADE_OFFPIECE':
    case 'LOWCHANCE_UPGRADE':
    default:
      activeCommand = 'reduce these:';
      break;
  }

  // closed?
  if (!isOpen) {
    return (
      <Box
        className="Recommendations"
      >
        <div className="header">
          <h3>Upgrade Recommendations (BETA)</h3>
          <button
            className="primary"
            type="button"
            onClick={() => setIsOpen(true)}
          >
            <img src={iconChevronDown} alt="open recommendations" />
          </button>
        </div>
      </Box>
    );
  }

  // render
  return (
    <Box
      className="Recommendations"
    >
      <div className="header">
        <h2>
          {'Upgrade Recommendations '}
          <small>(BETA)</small>
        </h2>
        <button
          className="primary"
          type="button"
          onClick={() => setIsOpen(false)}
        >
          <img src={iconChevronUp} alt="close recommendations" />
        </button>
      </div>
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
                    'NO_UPGRADE_OFFPIECE',
                    'NO_UPGRADE',
                    'LOWCHANCE_UPGRADE_OFFPIECE',
                    'LOWCHANCE_UPGRADE',
                    'TOO_MANY',
                    'TOO_MANY_FOR_BUILDS',
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
