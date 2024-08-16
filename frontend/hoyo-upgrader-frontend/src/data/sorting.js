/* eslint-disable prefer-const */

// sorting before filtering
// high numbers go to the right/bottom
export function getBuildQualitySortValue(evaluation) {
  // artifacts that don't have valuable substats go to the bottom
  if (evaluation.relevantSubstats.impossibleSubstats >= 8) {
    return 10;
  }

  // priorities
  let sortValue = -evaluation.upgradeChance;
  sortValue -= evaluation.upgradePotential * 0.01;
  sortValue -= evaluation.relevantSubstats.wastedSubstats * 0.0001;

  return sortValue;
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
