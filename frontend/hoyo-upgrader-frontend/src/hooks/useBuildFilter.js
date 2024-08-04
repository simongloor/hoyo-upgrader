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
  const [filteredBuilds, setFilteredBuilds] = useState([...builds]);
  // const [filteredArtifacts, setFilteredArtifacts] = useState(artifacts);

  useEffect(() => {
    let newBuilds = [...builds];

    // Filter by set
    if (filter.specificSet) {
      // CharacterOverviews
      // Only CharacterOverviews that want the set should be displayed
      newBuilds = newBuilds.filter((build) => build.sets.includes(filter.specificSet));
    }

    // Filter by piece
    if (filter.specificPiece) {
      const specificMainStat = filter.mainstat[filter.specificPiece];
      // CharacterOverviews
      // Only CharacterOverviews that want the main stat for the filtered piece should be displayed
      if (specificMainStat) {
        newBuilds = newBuilds.filter((build) => (
          build.mainstats[filter.specificPiece] === specificMainStat));
      }
    }

    // Filter by character
    if (filter.artifactWearer) {
      // CharacterOverviews
      // Only the CharacterOverview that matches the build should be displayed
      newBuilds = newBuilds.filter((build) => build.artifactWearer === filter.artifactWearer);
    }
    setFilteredBuilds(newBuilds);
  }, [builds, filter]);

  return filteredBuilds;
}
