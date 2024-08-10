/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch } from 'react-redux';

import paths from '../data/paths';
import { applyFilter } from '../data/actions/filter';
import useRecommendations from '../hooks/useRecommendations';

import Box from './Box';
import RecommendationRow from './RecommendationRow';
import '../styles/Recommendations.scss';

export default function Recommendations({ builds, artifacts, counts }) {
  const dispatch = useDispatch();

  const {
    loadRecommendations,
    recommendations,
    totals,
  } = useRecommendations(
    artifacts,
    builds,
    counts,
  );

  // event handlers
  const handleClickGroup = (group) => {
    const {
      set,
      piece,
      stat,
      offpieces,
      filterStrings,
    } = recommendations.groups[group];

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

  // render filter buttons
  const renderFilterButtons = (recommendationKeys) => recommendationKeys
    .map((recommendationKey) => (
      <button
        className={`primary ${recommendations.key === recommendationKey ? 'selected' : ''}`}
        type="button"
        onClick={() => loadRecommendations(recommendationKey)}
        key={recommendationKey}
      >
        <span>
          {
            recommendationKey === 'TOO_MANY'
              ? paths.recommendation[recommendationKey]
              : `${paths.recommendation[recommendationKey]} (${totals[recommendationKey]})`
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
      </div>
      <div className="filterSelection row">
        <span>bring to lvl 4:</span>
      </div>
      <div className="filterSelection row">
        <span>reduce these:</span>
        {
          renderFilterButtons([
            'TOO_MANY',
            'NO_UPGRADE',
          ])
        }
      </div>
      <span>
        These types of artifacts (hydro goblets, emblem flowers, etc.)
        have many Artifacts that match the criteria:
      </span>
      <div className="artifactGroups">
        {
          Object.keys(paths.piece).map((piece) => (
            <RecommendationRow
              key={piece}
              set={piece}
              data={recommendations}
              onClick={handleClickGroup}
            />
          ))
        }
      </div>
    </Box>
  );
}
