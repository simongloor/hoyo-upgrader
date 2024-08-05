/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */

import { getRelevantSubstatsOfArtifact } from './substats';
import paths from './paths';

// ---------------------------------------------------------
// artifact evaluation

export function getArtifactTier(artifactData, relevantSubstats) {
  if (!artifactData || !relevantSubstats) {
    return '?';
  }

  switch (artifactData.slotKey) {
    case 'flower':
    case 'plume': {
      if (relevantSubstats.wastedSubstats <= 1) {
        return 'S';
      }
      if (relevantSubstats.wastedSubstats <= 2) {
        return 'A';
      }
      if (relevantSubstats.wastedSubstats <= 4) {
        return 'B';
      }
      return 'C';
    }
    case 'sands':
    case 'goblet':
    case 'circlet': {
      if (relevantSubstats.wastedSubstats <= 2) {
        return 'S';
      }
      if (relevantSubstats.wastedSubstats <= 4) {
        return 'A';
      }
      return 'B';
    }
    default: {
      return '?';
    }
  }
}

// ---------------------------------------------------------
// sorting

export function getBuildQualitySortValue(relevantSubstats) {
  // wasted substats is the biggest factor
  let sortValue = relevantSubstats.wastedSubstats;

  // // filtered character build is pushed to be the first build in the list
  // if (filteredCharacterName && build.artifactWearer === filteredCharacterName) {
  //   sortValue -= 100;
  // }

  // artifacts that don't have valuable substats go to the bottom
  if (relevantSubstats.impossibleSubstats >= 8) {
    return 10;
  }

  // add chance as decimal
  const {
    missingRolls100,
    missingRolls75,
    missingRolls50,
    missingRolls25,
  } = relevantSubstats;

  if (missingRolls100 > 0) {
    sortValue -= 0.998;
  } else if (missingRolls75 > 0) {
    sortValue -= 0.75 ** missingRolls75;
  } else if (missingRolls50 > 0) {
    sortValue -= 0.5 ** missingRolls50;
  } else if (missingRolls25 > 0) {
    sortValue -= 0.25 ** missingRolls25;
  } else {
    sortValue -= 1;
  }

  return sortValue;
}

export function getArtifactQualitySortValue(artifact, filteredArtifactWearer) {
  // console.log(artifactEvaluation, filteredArtifactWearer);

  // artifacts without builds go to the bottom
  if (artifact.buildEvaluations.length === 0) {
    return 20;
  }

  // the filtered character build is used when the filter is active
  if (filteredArtifactWearer) {
    return artifact.buildEvaluations.find((evaluation) => (
      evaluation.artifactWearer === filteredArtifactWearer
    )).sortValue;
  }

  // return the lowest sort value of all builds
  return Math.min(
    ...artifact.buildEvaluations.map((evaluation) => evaluation.sortValue),
  );
}

// ---------------------------------------------------------
// data enhancement

function getBuildOfWearer(artifact) {
  return artifact.buildEvaluations.find((evaluation) => (
    evaluation.artifactWearer === artifact.artifactData.location
  ));
}

export function getUpgradePotential(
  relevantSubstats,
  evaluatedCompetingArtifact,
) {
  if (!evaluatedCompetingArtifact) {
    return 0;
  }
  const competingBuildEvaluation = getBuildOfWearer(evaluatedCompetingArtifact);
  return competingBuildEvaluation.relevantSubstats.wastedSubstats
    - relevantSubstats.wastedSubstats;
}
