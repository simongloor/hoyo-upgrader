/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */

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
  const { missingRollChances } = relevantSubstats;
  if (missingRollChances && missingRollChances.length > 0) {
    // console.log('missingRolls', missingRollChances);
    sortValue -= missingRollChances[missingRollChances.length - 1];
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
    const build = artifact.buildEvaluations.find((evaluation) => (
      evaluation.artifactWearer === filteredArtifactWearer
    ));
    return build ? build.sortValue : 0;
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
  rarity,
) {
  if (!evaluatedCompetingArtifact) {
    return (rarity === 5 ? 9 : 7)
      - relevantSubstats.wastedSubstats
      - relevantSubstats.impossibleSubstats;
  }
  const competingBuildEvaluation = getBuildOfWearer(evaluatedCompetingArtifact);
  return competingBuildEvaluation.relevantSubstats.wastedSubstats
    - relevantSubstats.wastedSubstats;
}

// get the chance of an build gaining at least one substat by rolling to the max level
export function getUpgradeChance(upgradePotential, relevantSubstats) {
  if (upgradePotential <= 0) {
    return 0;
  }

  const { missingRollChances } = relevantSubstats;
  const missingRolls = missingRollChances.length;

  const requiredRolls = missingRolls - upgradePotential;

  // the index is right after the required rolls
  // since the index is 0 based, the required rolls count matches the index
  return missingRollChances[requiredRolls];
}
