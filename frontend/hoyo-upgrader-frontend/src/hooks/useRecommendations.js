/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import {
  countArtifactsByBuilds,
  countArtifactsByQuality,
  // countArtifactsNotNeeded,
  // countArtifactsWithoutUpgrade,
} from '../data/countArtifacts';

export default function useRecommendations(
  artifacts,
  builds,
  counts,
) {
  // console.log(artifacts, builds, counts);
  const [recommendations, setRecommendations] = useState(null);

  // initialize
  useEffect(() => {
    if (artifacts) {
      // prepare data
      let newRecommendations = {};
      let recommendedGroups = null;

      // TOO_MANY: 'too many pieces',
      recommendedGroups = { ...counts };
      recommendedGroups.sortedGroups = recommendedGroups.sortedGroups
        .filter((group) => recommendedGroups.groups[group].count >= 10);
      newRecommendations.TOO_MANY = {
        ...recommendedGroups,
        totalCount: -1,
      };

      // TOO_MANY_FOR_BUILDS: 'too many for builds',
      newRecommendations.TOO_MANY_FOR_BUILDS = countArtifactsByBuilds(artifacts, builds);

      // Any other recommendations are quality based
      const artifactGroupsByQuality = countArtifactsByQuality(artifacts, builds);
      newRecommendations = {
        ...newRecommendations,
        ...artifactGroupsByQuality,
      };

      setRecommendations(newRecommendations);
    }

    // console.log('useRecommendations initialized');
  }, [artifacts, builds]);

  return recommendations;
}
