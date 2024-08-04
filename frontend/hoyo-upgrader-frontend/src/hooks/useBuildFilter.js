/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const emptyArtifactData = {
  flower: null,
  plume: null,
  sands: null,
  goblet: null,
  circlet: null,
};

export default function useBuildFilter(artifacts, characterJson) {
  const filter = useSelector((state) => state.filter);
  const [filteredArtifacts, setFilteredArtifacts] = useState(artifacts);

  useEffect(() => {
    const artifactsToFilter = { ...artifacts };

    // Add missing artifact byWearer entries
    characterJson.forEach((build) => {
      if (!artifactsToFilter.byWearer[build.artifactWearer]) {
        artifactsToFilter.byWearer[build.artifactWearer] = { ...emptyArtifactData };
      }
    });

    // Filter by set
    if (filter.specificSet) {
      // CharacterOverviews
      // Only CharacterOverviews that want the set should be displayed
      artifactsToFilter.byWearer = characterJson
        .reduce((acc, build) => {
          if (build.sets.includes(filter.specificSet)) {
            acc[build.artifactWearer] = artifactsToFilter.byWearer[build.artifactWearer];
          }
          return acc;
        }, {});
    }

    // Filter by piece
    if (filter.specificPiece) {
      const specificMainStat = filter.mainstat[filter.specificPiece];
      // CharacterOverviews
      // Only CharacterOverviews that want the same piece and main stat should be displayed
      if (specificMainStat) {
        artifactsToFilter.byWearer = { ...artifactsToFilter.byWearer };
        Object.keys(artifactsToFilter.byWearer).forEach(
          // remove characters that don't want the same main stat for the piece
          (character) => {
            const build = characterJson.find((b) => b.artifactWearer === character);
            if (
              build
              && !build.mainstats[filter.specificPiece].includes(specificMainStat)
            ) {
              delete artifactsToFilter.byWearer[character];
            }
          },
        );
      }
    }

    // Filter by character
    if (filter.artifactWearer) {
      // CharacterOverviews
      // Only the CharacterOverview that matches the build should be displayed
      if (artifactsToFilter.byWearer[filter.artifactWearer]) {
        artifactsToFilter.byWearer = {
          [filter.artifactWearer]: artifactsToFilter.byWearer[filter.artifactWearer],
        };
      }
    }
    setFilteredArtifacts(artifactsToFilter);
  }, [artifacts, filter]);

  return filteredArtifacts;
}
