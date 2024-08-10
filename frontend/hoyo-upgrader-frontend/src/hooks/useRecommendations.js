/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import { countUselessArtifacts } from '../data/countArtifacts';

export default function useRecommendations(
  artifacts,
  builds,
  counts,
) {
  // console.log(artifacts, builds, counts);
  const [recommendations, setRecommendations] = useState(null);

  // initialize
  useEffect(() => {
    if (artifacts.isEvaluated) {
      // prepare data
      const newRecommendations = {};
      let recommendedGroups = null;
      const uselessArtifacts = countUselessArtifacts(artifacts.asList, builds);

      // TOO_MANY
      recommendedGroups = { ...counts };
      recommendedGroups.sortedGroups = recommendedGroups.sortedGroups
        .filter((group) => recommendedGroups.groups[group].count >= 10);

      newRecommendations.TOO_MANY = {
        ...recommendedGroups,
        totalCount: 0,
      };

      // NO_UPGRADE
      newRecommendations.NO_UPGRADE = {
        ...uselessArtifacts,
        totalCount: uselessArtifacts.sortedGroups.reduce(
          (acc, group) => (acc + uselessArtifacts.groups[group].count),
          0,
        ),
      };

      setRecommendations(newRecommendations);
    }

    // console.log('useRecommendations initialized');
  }, [artifacts, builds]);

  return recommendations;
}
