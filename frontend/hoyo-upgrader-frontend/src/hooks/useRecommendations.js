/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import { countUselessArtifacts } from '../data/countArtifacts';

const getTotalArtifactCount = (
  uselessArtifacts,
) => {
  const totals = {};

  totals.NO_UPGRADE = uselessArtifacts.sortedGroups.reduce(
    (acc, group) => (acc + uselessArtifacts.groups[group].count),
    0,
  );

  return totals;
};

const getRecommendedGroups = (
  recommendationKey,
  counts,
  uselessArtifacts,
) => {
  let recommendedGroups = null;
  switch (recommendationKey) {
    case 'NO_UPGRADE': {
      recommendedGroups = uselessArtifacts;
      break;
    }
    case 'TOO_MANY':
    default: {
      recommendedGroups = { ...counts };
      recommendedGroups.sortedGroups = recommendedGroups.sortedGroups
        .filter((group) => recommendedGroups.groups[group].count >= 10);
      break;
    }
  }
  return recommendedGroups;
};

// ---------------------------------------------------------

export default function useRecommendations(
  artifacts,
  builds,
  counts,
) {
  const [recommendations, setRecommendations] = useState({
    key: '',
    sortedGroups: [],
    groups: {},
  });
  const [uselessArtifacts, setUselessArtifacts] = useState({ sortedGroups: [], groups: {} });
  const [totals, setTotals] = useState({
    NO_UPGRADE: 0,
  });

  const loadRecommendations = (recommendationKey) => {
    setRecommendations({
      key: recommendationKey,
      ...getRecommendedGroups(
        recommendationKey,
        counts,
        uselessArtifacts,
      ),
    });
  };

  // initialize
  useEffect(() => {
    if (artifacts.isEvaluated) {
      const newUselessArtifacts = countUselessArtifacts(artifacts.asList, builds);
      setUselessArtifacts(newUselessArtifacts);

      setTotals(getTotalArtifactCount(
        newUselessArtifacts,
      ));

      loadRecommendations('TOO_MANY');
    }

    // console.log('useRecommendations initialized');
  }, [artifacts, builds]);

  return {
    loadRecommendations,
    recommendations,
    totals,
  };
}
