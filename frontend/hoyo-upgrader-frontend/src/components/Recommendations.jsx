/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import paths from '../data/paths';
import { applyFilter } from '../data/actions/filter';

import Artifact from './Artifact';
import Box from './Box';
import '../styles/Recommendations.scss';
import { countUselessArtifacts } from '../data/countArtifacts';

export default function Recommendations({ builds, artifacts, counts }) {
  const dispatch = useDispatch();
  const [recommendation, setRecommendation] = useState(paths.recommendation.TOO_MANY);

  const [uselessArtifacts, setUselessArtifacts] = useState({ sortedGroups: [], groups: {} });

  useEffect(() => {
    if (artifacts.isEvaluated) {
      const newUselessArtifacts = countUselessArtifacts(artifacts.asList, builds);
      // console.log(newUselessArtifacts);
      setUselessArtifacts(newUselessArtifacts);
    }
  }, [artifacts, builds]);

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

  // render recommendations
  let recommendations = null;
  switch (recommendation) {
    case paths.recommendation.NO_UPGRADE: {
      recommendations = uselessArtifacts.sortedGroups
        // .slice(0, 16)
        .map((group) => (
          <button
            type="button"
            onClick={() => handleClickGroup(group)}
            alt={group}
            key={group}
          >
            <Artifact
              piece={uselessArtifacts.groups[group].piece}
              set={uselessArtifacts.groups[group].set}
              mainstat={uselessArtifacts.groups[group].stat}
              count={uselessArtifacts.groups[group].count}
            />
          </button>
        ));
      break;
    }
    case paths.recommendation.TOO_MANY:
    default: {
      recommendations = counts.sortedGroups
        // .slice(0, 16)
        .map((group) => (
          counts.groups[group].count >= 10 && (
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
          )
        ));
      break;
    }
  }

  // render filter buttons
  const renderFilterButtons = (recommendationKeys) => recommendationKeys
    .map((recommendationType) => (
      <button
        className={`primary ${recommendation === recommendationType ? 'selected' : ''}`}
        type="button"
        onClick={() => setRecommendation(recommendationType)}
        key={recommendationType}
      >
        <span>
          {
            recommendationType === paths.recommendation.TOO_MANY
              ? recommendationType
              : `${recommendationType} (${getTotalArtifactCount(recommendationType)})`
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
      <div className="artifactGroups row">
        { recommendations }
      </div>
    </Box>
  );
}
