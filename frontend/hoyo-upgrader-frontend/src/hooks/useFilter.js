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

export default function useFilter(artifacts, characterJson) {
  const filter = useSelector((state) => state.filter);
  const [filteredArtifacts, setFilteredArtifacts] = useState(artifacts);

  useEffect(() => {
    const artifactsToFilter = { ...artifacts };

    // Add missing artifact byCharacter entries
    characterJson.forEach((build) => {
      if (!artifactsToFilter.byCharacter[build.artifactWearer]) {
        artifactsToFilter.byCharacter[build.artifactWearer] = { ...emptyArtifactData };
      }
    });

    // Filter by set
    if (filter.specificSet) {
      // CharacterOverviews
      // Only CharacterOverviews that want the set should be displayed
      artifactsToFilter.byCharacter = characterJson
        .reduce((acc, build) => {
          if (build.sets.includes(filter.specificSet)) {
            acc[build.artifactWearer] = artifactsToFilter.byCharacter[build.artifactWearer];
          }
          return acc;
        }, {});

      // Artifacts
      // Only Artifacts that belong to the set should be displayed
      artifactsToFilter.asList = artifactsToFilter.asList
        .filter((artifact) => artifact.setKey === filter.specificSet);
    }

    // Filter by piece
    if (filter.specificPiece) {
      const specificMainStat = filter.mainstat[filter.specificPiece];

      // Artifacts
      // Only Artifacts that belong to the piece should be displayed
      artifactsToFilter.asList = artifactsToFilter.asList
        .filter((artifact) => artifact.slotKey === filter.specificPiece);
      // Also filter by main stat
      if (specificMainStat) {
        artifactsToFilter.asList = artifactsToFilter.asList
          .filter((artifact) => specificMainStat === artifact.mainStatKey);
      }

      // CharacterOverviews
      // Only CharacterOverviews that want the same piece and main stat should be displayed
      if (specificMainStat) {
        artifactsToFilter.byCharacter = { ...artifactsToFilter.byCharacter };
        Object.keys(artifactsToFilter.byCharacter).forEach(
          // remove characters that don't want the same main stat for the piece
          (character) => {
            const build = characterJson.find((b) => b.artifactWearer === character);
            if (
              build
              && !build.mainstats[filter.specificPiece].includes(specificMainStat)
            ) {
              delete artifactsToFilter.byCharacter[character];
            }
          },
        );
      }
    }

    // Filter by character
    if (filter.artifactWearer) {
      // CharacterOverviews
      // Only the CharacterOverview that matches the build should be displayed
      if (artifactsToFilter.byCharacter[filter.artifactWearer]) {
        artifactsToFilter.byCharacter = {
          [filter.artifactWearer]: artifactsToFilter.byCharacter[filter.artifactWearer],
        };
      }

      // Artifacts
      // Only Artifacts that can be used by the build should be displayed
      if (!(filter.specificPiece && filter.mainstat[filter.specificPiece])) {
        const build = characterJson.find((b) => b.artifactWearer === filter.artifactWearer);
        artifactsToFilter.asList = artifactsToFilter.asList
          .filter((artifact) => (
            (filter.showOffpieces || build.sets.includes(artifact.setKey))
            && (
              artifact.slotKey === 'flower'
              || artifact.slotKey === 'plume'
              || build.mainstats[artifact.slotKey].includes(artifact.mainStatKey)
            )
          ));
      }
    }
    setFilteredArtifacts(artifactsToFilter);
  }, [artifacts, filter]);

  return filteredArtifacts;
}
