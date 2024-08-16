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
    // console.log(b);
    if (
      !b.artifacts.flower
      || !b.artifacts.plume
      || !b.artifacts.sands
      || !b.artifacts.goblet
      || !b.artifacts.circlet
    ) {
      acc.missingArtifacts.push(b);
    } else if (b.relevantSubstats.missingRollChances.length > 0) {
      acc.missingRolls.push(b);
    } else {
      acc.completeBuilds.push(b);
    }
    return acc;
  }, {
    missingArtifacts: [],
    missingRolls: [],
    completeBuilds: [],
  });
}

// ---------------------------------------------------------

export default function useBuildEvaluation(artifacts, characters) {
  const [evaluatedBuilds, setEvaluatedBuilds] = useState(null);

  useEffect(() => {
    if (artifacts.asList.length > 0 && characters.length > 0) {
      // console.log(artifacts, characters);
      setEvaluatedBuilds(
        splitIntoQualityLevels(
          evaluateBuilds(characters, artifacts.asList),
        ),
      );
    }
  }, [artifacts, characters]);

  // console.log(evaluatedBuilds);
  return evaluatedBuilds;
}
