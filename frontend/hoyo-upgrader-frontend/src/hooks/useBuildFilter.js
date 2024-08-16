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

export default function useBuildFilter(builds) {
  const filter = useSelector((state) => state.filter);
  const [filteredBuilds, setFilteredBuilds] = useState(null);
  // const [filteredArtifacts, setFilteredArtifacts] = useState(artifacts);
  // console.log(builds);

  useEffect(() => {
    if (builds) {
      // // measure time
      // const t0 = performance.now();

      const newBuilds = { ...builds };
      Object.keys(builds).forEach((key) => {
        // Filter by set
        if (filter.specificSet && !filter.showOffpieces) {
          // Only CharacterOverviews that want the set should be displayed
          newBuilds[key] = newBuilds[key].filter((b) => (
            b.build.sets.includes(filter.specificSet)
          ));
        }

        // Filter by piece
        if (filter.specificPiece) {
          const specificMainStat = filter.mainstat[filter.specificPiece];
          // Only CharacterOverviews that want the main stat
          // for the filtered piece should be displayed
          if (specificMainStat) {
            newBuilds[key] = newBuilds[key].filter((b) => (
              b.build.mainstats[filter.specificPiece].includes(specificMainStat)));
          }
        }
      });

      // Apply
      setFilteredBuilds(newBuilds);

      // // measure time
      // const t1 = performance.now();
      // console.log(`useBuildFilter took ${t1 - t0} ms.`);
    }
  }, [builds, filter]);

  return filteredBuilds;
}
