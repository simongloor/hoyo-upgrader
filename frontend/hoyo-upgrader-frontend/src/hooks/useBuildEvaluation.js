/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getCharactersTotalSubstats } from '../data/substats';
import { getEquippedArtifacts } from '../data/builds';

function evaluateBuilds(
  characters,
  artifactsAsList,
) {
  return characters.map((build) => {
    const artifacts = getEquippedArtifacts(build.artifactWearer, artifactsAsList);
    const relevantSubstats = getCharactersTotalSubstats(build.artifactWearer, artifacts);
    return {
      build,
      artifacts,
      relevantSubstats,
    };
  }).sort((a, b) => (
    b.relevantSubstats.wastedSubstats - a.relevantSubstats.wastedSubstats
  ));
}

// ---------------------------------------------------------

export default function useBuildEvaluation(artifacts, characters) {
}
