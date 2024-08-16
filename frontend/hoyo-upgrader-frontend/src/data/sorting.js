/* eslint-disable prefer-const */

// sorting before filtering
// high numbers go to the right/bottom
export function getBuildQualitySortValue(artifactData, evaluation) {
  // artifacts that don't have valuable substats go to the bottom
  if (evaluation.relevantSubstats.impossibleSubstats >= 8) {
    return 10;
  }

  // priorities
  let sortValue = -evaluation.upgradeChance;
  sortValue -= evaluation.upgradePotential * 0.01;
  sortValue += evaluation.relevantSubstats.wastedSubstats * 0.0001;
  sortValue -= artifactData.location === evaluation.artifactWearer ? 0.000001 : 0;

  return sortValue;
}

// ---------------------------------------------------------

export function sortIntoSections(artifacts) {
  const sortedArtifacts = {
    totalCount: artifacts.length,
    chance100: [],
    chance75: [],
    chance50: [],
    chance30: [],
    chanceLow: [],
    noUpgrade: [],
    notNeeded: [],
  };

  artifacts.forEach((artifact) => {
    if (artifact.buildEvaluations.length === 0) {
      // console.log('no build', artifact);
      sortedArtifacts.notNeeded.push(artifact);
      return;
    }
    if (artifact.buildEvaluations[0].upgradePotential === 0) {
      // console.log('no potential', artifact.buildEvaluations[0]);
      sortedArtifacts.noUpgrade.push(artifact);
      return;
    }
    if (artifact.buildEvaluations[0].upgradeChance === 1) {
      // console.log('100%', artifact.buildEvaluations[0]);
      sortedArtifacts.chance100.push(artifact);
      return;
    }
    if (artifact.buildEvaluations[0].upgradeChance >= 0.75) {
      // console.log('75%', artifact.buildEvaluations[0]);
      sortedArtifacts.chance75.push(artifact);
      return;
    }
    if (artifact.buildEvaluations[0].upgradeChance >= 0.5) {
      // console.log('50%', artifact.buildEvaluations[0]);
      sortedArtifacts.chance50.push(artifact);
      return;
    }
    if (artifact.buildEvaluations[0].upgradeChance >= 0.3) {
      // console.log('30%', artifact.buildEvaluations[0]);
      sortedArtifacts.chance30.push(artifact);
      return;
    }
    sortedArtifacts.chanceLow.push(artifact);
  });

  return sortedArtifacts;
}

// ---------------------------------------------------------

// sorting after filtering
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
