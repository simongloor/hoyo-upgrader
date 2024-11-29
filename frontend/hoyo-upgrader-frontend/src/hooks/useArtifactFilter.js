/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getArtifactQualitySortValue, sortIntoSections } from '../data/sorting';

export default function useArtifactFilter(artifacts, characters) {
  const filter = useSelector((state) => state.filter);
  const [filteredArtifacts, setFilteredArtifacts] = useState(null);

  useEffect(() => {
    if (artifacts) {
      // console.log('useArtifactFilter');

      // // measure time
      // const t0 = performance.now();

      let artifactsToFilter = [...artifacts];

      // Filter out 4* while offpieces are enabled
      if (filter.showOffpieces) {
        artifactsToFilter = artifactsToFilter
          .filter((artifact) => artifact.artifactData.rarity === 5);
      }

      // Filter by set
      if (filter.specificSet && !filter.showOffpieces) {
        // console.log('filter.specificSet', filter.specificSet);

        // Only Artifacts that belong to the set should be displayed
        artifactsToFilter = artifactsToFilter
          .filter((artifact) => artifact.artifactData.setKey === filter.specificSet);
      }

      // Filter by piece
      if (filter.specificPiece) {
        // console.log('filter.specificPiece', filter.specificPiece);
        const specificMainStat = filter.mainstat[filter.specificPiece];

        // Only Artifacts that belong to the piece should be displayed
        artifactsToFilter = artifactsToFilter
          .filter((artifact) => artifact.artifactData.slotKey === filter.specificPiece);
        // Also filter by main stat
        if (specificMainStat) {
          artifactsToFilter = artifactsToFilter
            .filter((artifact) => specificMainStat === artifact.artifactData.mainStatKey);
        }
      }

      // Filter by character
      if (filter.artifactWearer && filter.filterCharacterSets) {
        // console.log('filter.artifactWearer', filter.artifactWearer);
        // Only Artifacts that can be used by the build should be displayed
        const build = characters.find((b) => b.artifactWearer === filter.artifactWearer);

        artifactsToFilter = artifactsToFilter
          .filter((artifact) => {
            if (artifact.artifactData.location === filter.artifactWearer) {
              return true;
            }

            if (!filter.showOffpieces && !build.sets.includes(artifact.artifactData.setKey)) {
              // set doesn't match
              return false;
            }

            const alreadyFilteredByMainStat = (
              filter.specificPiece && filter.mainstat[filter.specificPiece]
            );

            const mainstatMatchesCharacter = (
              artifact.artifactData.slotKey === 'flower'
              || artifact.artifactData.slotKey === 'plume'
              || build.mainstats[artifact.artifactData.slotKey]
                .includes(artifact.artifactData.mainStatKey)
            );

            if (!alreadyFilteredByMainStat && !mainstatMatchesCharacter) {
              // mainstat doesn't match
              return false;
            }

            return true;
          });
      }

      // Filter the evaluations
      artifactsToFilter = artifactsToFilter
        .map((a) => ({
          ...a,
          buildEvaluations: a.buildEvaluations.filter((evaluation) => {
            const build = characters.find((b) => b.artifactWearer === evaluation.artifactWearer);

            // Filter out any build that does not want the set unless offpieces are allowed
            if (!filter.showOffpieces && !build.sets.includes(a.artifactData.setKey)) {
              return false;
            }

            // // Filter out any build that does not provide upgrade potential
            // if (
            //   evaluation.upgradePotential < 0
            //   // show for the selected character
            //   && evaluation.artifactWearer !== filter.artifactWearer
            //   // show for the artifact's wearer
            //   && evaluation.artifactWearer !== a.artifactData.location
            // ) {
            //   // console.log('no upgrade potential', evaluation);
            //   return false;
            // }

            return true;
          }),
        }));

      // Add highest upgrade potential
      artifactsToFilter.forEach((artifact, iArtifact) => {
        const highestUpgradePotential = artifact.buildEvaluations
          .reduce((acc, evaluation) => {
            if (evaluation.upgradePotential > acc) {
              return evaluation.upgradePotential;
            }
            return acc;
          }, 0);
        artifactsToFilter[iArtifact].highestUpgradePotential = highestUpgradePotential;
      });

      // Push the build of the filtered character to the front of the evaluations
      if (filter.artifactWearer) {
        artifactsToFilter.forEach((artifact, iArtifact) => {
          artifactsToFilter[iArtifact].buildEvaluations.sort((a, b) => (
            (a.artifactWearer === filter.artifactWearer ? -10000 : a.sortValue)
            - (b.artifactWearer === filter.artifactWearer ? -10000 : b.sortValue)
          ));
        });
      }

      // Sort artifacts
      artifactsToFilter
        .sort((a, b) => (
          getArtifactQualitySortValue(a, filter.artifactWearer)
            - getArtifactQualitySortValue(b, filter.artifactWearer)
        ));

      // Mark highlighted artifacts
      if (filter.highlightArtifactKeys) {
        artifactsToFilter.forEach((artifact, iArtifact) => {
          artifactsToFilter[iArtifact].highlight = filter.highlightArtifactKeys
            .includes(artifact.artifactData.key);
        });
      }

      // // DEBUGGING
      // artifactsToFilter = artifactsToFilter.slice(115, 150);

      // apply
      setFilteredArtifacts(
        sortIntoSections(artifactsToFilter),
      );
    }

    // // measure time
    // const t1 = performance.now();
    // console.log(`useArtifactFilter took ${t1 - t0} ms.`);
  }, [artifacts, filter]);

  // console.log(filteredArtifacts);
  return filteredArtifacts;
}
