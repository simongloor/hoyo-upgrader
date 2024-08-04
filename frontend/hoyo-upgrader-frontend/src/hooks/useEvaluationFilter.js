/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function useEvaluationFilter(artifacts, filteredBuilds) {
  const filter = useSelector((state) => state.filter);
  const [filteredArtifacts, setFilteredArtifacts] = useState({ ...artifacts });

  useEffect(() => {
    const artifactsToFilter = { ...artifacts };

    // if (!filter.showOffpieces) {
    //   // Filter by set
    //   if (filter.specificSet) {
    //   }

    //   // Filter by piece
    //   if (filter.specificPiece) {
    //   }

    //   // Filter by character
    //   if (filter.artifactWearer) {
    //   }
    // }

    setFilteredArtifacts(artifactsToFilter);
  }, [artifacts, filter]);

  return filteredArtifacts;
}
