/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import paths from '../data/paths';
import { applyFilter } from '../data/actions/filter';
import { countUselessArtifacts } from '../data/countArtifacts';

import Box from './Box';
import RecommendationRow from './RecommendationRow';
import '../styles/Recommendations.scss';

export default function Recommendations({ builds, artifacts, counts }) {
  const dispatch = useDispatch();
  // const [recommendation, setRecommendation] = useState(paths.recommendation.TOO_MANY);
  const [recommendations, setRecommendations] = useState({
    key: '',
    sortedGroups: [],
    groups: {},
  });

  const [uselessArtifacts, setUselessArtifacts] = useState({ sortedGroups: [], groups: {} });

  const loadRecommendations = (recommendationKey) => () => {
    let recommendedGroups = null;
    switch (recommendationKey) {
      case paths.recommendation.NO_UPGRADE: {
        recommendedGroups = uselessArtifacts;
        break;
      }
      case paths.recommendation.TOO_MANY:
      default: {
        recommendedGroups = { ...counts };
        recommendedGroups.sortedGroups = recommendedGroups.sortedGroups
          .filter((group) => recommendedGroups.groups[group].count >= 10);
        break;
      }
    }
    setRecommendations({
      key: recommendationKey,
      ...recommendedGroups,
    });
  };

  useEffect(() => {
    if (artifacts.isEvaluated) {
      const newUselessArtifacts = countUselessArtifacts(artifacts.asList, builds);
      // console.log(newUselessArtifacts);
      setUselessArtifacts(newUselessArtifacts);
    }

    loadRecommendations(paths.recommendation.TOO_MANY)();
  }, [artifacts, builds]);

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

  // helper functions
  const getTotalArtifactCount = (recommendationKey) => {
    switch (recommendationKey) {
      case paths.recommendation.NO_UPGRADE:
        return uselessArtifacts.sortedGroups.reduce(
          (acc, group) => (acc + uselessArtifacts.groups[group].count),
          0,
        );
      case paths.recommendation.TOO_MANY:
      default:
        return '';
    }
  };

  // render filter buttons
  const renderFilterButtons = (recommendationKeys) => recommendationKeys
    .map((recommendationKey) => (
      <button
        className={`primary ${recommendations.key === recommendationKey ? 'selected' : ''}`}
        type="button"
        onClick={loadRecommendations(recommendationKey)}
        key={recommendationKey}
      >
        <span>
          {
            recommendationKey === paths.recommendation.TOO_MANY
              ? recommendationKey
              : `${recommendationKey} (${getTotalArtifactCount(recommendationKey)})`
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
            paths.recommendation.TOO_MANY,
            paths.recommendation.NO_UPGRADE,
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
