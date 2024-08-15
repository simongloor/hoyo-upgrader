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

function splitIntoQualityLevels(evaluatedBuilds) {
  return evaluatedBuilds.reduce((acc, b) => {
    if (b.build.relevantSubstats.missingRollChances.length > 0) {
      acc.missingRolls = [...acc.missingRolls, b];
    } else if (
      !b.artifacts.flower
      || !b.artifacts.plume
      || !b.artifacts.sands
      || !b.artifacts.goblet
      || !b.artifacts.circlet
    ) {
      acc.missingArtifacts = [...acc.missingArtifacts, b];
    } else {
      acc.completeBuilds = [...acc.completeBuilds, b];
    }
    return acc;
  }, {});
}

// ---------------------------------------------------------

export default function useBuildEvaluation(artifacts, characters) {
}
