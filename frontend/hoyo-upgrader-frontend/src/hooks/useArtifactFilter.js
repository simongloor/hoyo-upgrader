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

export default function useArtifactFilter(artifacts, characterJson) {
  const filter = useSelector((state) => state.filter);
  const [filteredArtifacts, setFilteredArtifacts] = useState(artifacts);

  useEffect(() => {
    const artifactsToFilter = { ...artifacts };

    // Filter by set
    if (filter.specificSet) {
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
    }

    // Filter by character
    if (filter.artifactWearer) {
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
