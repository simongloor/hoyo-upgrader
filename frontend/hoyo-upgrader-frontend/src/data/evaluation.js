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
    return {
      upgradeIsRelevant: false,
      upgradePotential: 0,
    };
    // return (rarity === 5 ? 9 : 7)
    //   - relevantSubstats.wastedSubstats
    //   - relevantSubstats.impossibleSubstats;
  }
  const competingBuildEvaluation = getBuildOfWearer(evaluatedCompetingArtifact);
  return {
    upgradeIsRelevant: true,
    upgradePotential: competingBuildEvaluation.relevantSubstats.wastedSubstats
      - relevantSubstats.wastedSubstats,
  };
}

// get the chance of an build gaining at least one substat by rolling to the max level
export function getUpgradeChance(upgradePotential, relevantSubstats) {
  // no upgrade potential?
  if (upgradePotential <= 0) {
    return 0;
  }

  const { missingRollChances } = relevantSubstats;
  const missingRolls = missingRollChances.length;

  const requiredRolls = missingRolls - upgradePotential;

  // already an upgrade?
  if (requiredRolls < 0) {
    return 1;
  }

  // the index is right after the required rolls
  // since the index is 0 based, the required rolls count matches the index
  return missingRollChances[requiredRolls];
}
