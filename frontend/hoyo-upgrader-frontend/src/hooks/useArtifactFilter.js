/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function useArtifactFilter(artifacts, characters, filteredBuilds) {
  const filter = useSelector((state) => state.filter);
  const [filteredArtifacts, setFilteredArtifacts] = useState({ ...artifacts });

  useEffect(() => {
    const artifactsToFilter = { ...artifacts };

    // Filter by set
    if (filter.specificSet) {
      // console.log('filter.specificSet', filter.specificSet);

      // Only Artifacts that belong to the set should be displayed
      artifactsToFilter.asList = artifactsToFilter.asList
        .filter((artifact) => artifact.artifactData.setKey === filter.specificSet);
    }

    // Filter by piece
    if (filter.specificPiece) {
      // console.log('filter.specificPiece', filter.specificPiece);
      const specificMainStat = filter.mainstat[filter.specificPiece];

      // Only Artifacts that belong to the piece should be displayed
      artifactsToFilter.asList = artifactsToFilter.asList
        .filter((artifact) => artifact.artifactData.slotKey === filter.specificPiece);
      // Also filter by main stat
      if (specificMainStat) {
        artifactsToFilter.asList = artifactsToFilter.asList
          .filter((artifact) => specificMainStat === artifact.artifactData.mainStatKey);
      }
    }

    // Filter by character
    if (filter.artifactWearer) {
      // console.log('filter.artifactWearer', filter.artifactWearer);
      // Only Artifacts that can be used by the build should be displayed
      const build = characters.find((b) => b.artifactWearer === filter.artifactWearer);

      artifactsToFilter.asList = artifactsToFilter.asList
        .filter((artifact) => {
          if (artifact.artifactData.location === filter.artifactWearer) {
            return true;
          }

          const setMatches = filter.showOffpieces
            || build.sets.includes(artifact.artifactData.setKey);

          const mainstatMatches = (filter.specificPiece && filter.mainstat[filter.specificPiece])
            || (
              artifact.artifactData.slotKey === 'flower'
              || artifact.artifactData.slotKey === 'plume'
              || build.mainstats[artifact.artifactData.slotKey]
                .includes(artifact.artifactData.mainStatKey)
            );

          return setMatches && mainstatMatches;
        });
    }

    // // Filter the evaluations
    // artifactsToFilter.asList = artifactsToFilter.asList
    //   .map((a) => ({
    //     ...a,
    //     buildEvaluations: a.buildEvaluations.filter((evaluation) => (
    //       filteredBuilds.find((build) => build.artifactWearer === evaluation.artifactWearer)
    //     )),
    //   }));

    // Add highest upgrade potential
    artifactsToFilter.asList.forEach((artifact, iArtifact) => {
      const highestUpgradePotential = artifact.buildEvaluations
        .reduce((acc, evaluation) => {
          if (evaluation.upgradePotential > acc) {
            return evaluation.upgradePotential;
          }
          return acc;
        }, 0);
      artifactsToFilter.asList[iArtifact].highestUpgradePotential = highestUpgradePotential;
    });

    // // DEBUGGING
    // artifactsToFilter.asList = artifactsToFilter.asList.slice(100, 150);

    setFilteredArtifacts(artifactsToFilter);
  }, [artifacts, filter]);

  // console.log(filteredArtifacts);
  return filteredArtifacts;
}
