/* eslint-disable no-unused-vars */
export function countArtifactsBySet(artifactData) {
  const counts = {
    sortedSets: [],
    sets: {},
  };
  artifactData.forEach((artifact) => {
    // Count sets
    if (!counts.sets[artifact.set]) {
      counts.sets[artifact.set] = {
        total: 0,
        flower: 0,
        plume: 0,
        sands: 0,
        goblet: 0,
        circlet: 0,
      };
    }
    counts.sets[artifact.set].total += 1;

    // Count pieces
    counts.sets[artifact.set][artifact.piece] += 1;
  });

  // Sort sets by total count
  counts.sortedSets = Object.keys(counts.sets)
    .sort((a, b) => counts.sets[b].total - counts.sets[a].total);
  return counts;
}

export function countTowardsCustomGroup(
  counter,
  artifactData,
  useStat,
  offpieces,
  increment = 1,
) {
  const group = `${offpieces ? 'any' : artifactData.set}-${artifactData.slotKey}-${artifactData.mainStatKey}`;
  const newCounter = counter;
  if (!counter[group]) {
    newCounter[group] = {
      piece: artifactData.slotKey,
      set: offpieces ? artifactData.mainStatKey : artifactData.set,
      stat: useStat ? artifactData.mainStatKey : '',
      offpieces,
      count: increment,
      filterStrings: [artifactData.key],
    };
  } else {
    newCounter[group].count += increment;
    newCounter[group].filterStrings.push(artifactData.key);
  }
  return newCounter;
}

export function countTowardsGroup(counter, artifactData, offpieces) {
  return countTowardsCustomGroup(
    counter,
    artifactData,
    artifactData.slotKey !== 'flower' && artifactData.slotKey !== 'plume',
    offpieces,
  );
}

export function sortArtifactGroupCounter(counter) {
  return {
    totalCount: Object.values(counter).reduce((acc, cur) => acc + cur.count, 0),
    sortedGroups: Object.keys(counter)
      .sort((a, b) => counter[b].count - counter[a].count),
    groups: counter,
  };
}

export function countArtifactsByGroup(artifactData) {
  let groupCounts = {};
  artifactData.forEach((artifact) => {
    groupCounts = countTowardsGroup(groupCounts, artifact);
  });
  return sortArtifactGroupCounter(groupCounts);
}

// ----------------------------------------------------------------------------

function getBuildsRelevantForFixedArtifact(artifact, builds, onSet) {
  return onSet
    ? builds.filter((build) => (
      build.sets.includes(artifact.setKey)
    ))
    : builds;
}

function getBuildsRelevantForMainstatArtifact(artifact, builds, onSet) {
  return builds.filter((build) => (
    build.mainstats[artifact.slotKey].includes(artifact.mainStatKey)
    && (build.sets.includes(artifact.setKey) || !onSet)
  ));
}

function filterEvaluationsByBuilds(builds, evaluations) {
  return evaluations.filter((evaluation) => (
    builds.some((build) => build.artifactWearer === evaluation.artifactWearer)
  ));
}

export function getBuildsRelevantForArtifact(artifactData, builds, onSet) {
  let relevantBuilds = [];
  switch (artifactData.slotKey) {
    case 'flower':
    case 'plume': {
      relevantBuilds = getBuildsRelevantForFixedArtifact(artifactData, builds, onSet);
      break;
    }
    case 'sands':
    case 'circlet':
    case 'goblet': {
      relevantBuilds = getBuildsRelevantForMainstatArtifact(artifactData, builds, onSet);
      break;
    }
    default: {
      break;
    }
  }
  return relevantBuilds;
}

export function countArtifactsByQuality(artifacts, builds) {
  let noUpgrade = {};
  let maybeUpgrade100 = {};
  let maybeUpgrade30 = {};
  let upgrade100 = {};
  let upgrade75 = {};
  let upgrade50 = {};
  let lowChance = {};

  let noUpgradeOffpiece = {};
  let lowChanceOffpiece = {};

  artifacts.forEach((a) => {
    // Skip if artifact is equipped
    if (!a.artifactData.location) {
      // Evaluate on set with relevant Evaluations
      const relevantBuildsOnSet = getBuildsRelevantForArtifact(a.artifactData, builds, true);
      const relevantEvaluationsOnSet = filterEvaluationsByBuilds(
        relevantBuildsOnSet,
        a.buildEvaluations,
      );
      const hasCharacterWithoutArtifactOnSet = relevantEvaluationsOnSet
        .some((e) => !e.upgradeIsRelevant);

      if (
        // NO_UPGRADE
        !hasCharacterWithoutArtifactOnSet
        && (
          relevantEvaluationsOnSet.length === 0
          || !relevantEvaluationsOnSet.some((e) => e.upgradePotential >= 0)
        )
      ) {
        noUpgrade = countTowardsGroup(noUpgrade, a.artifactData, false);
      } else if (
        // MAYBE_UPGRADE_100
        relevantEvaluationsOnSet.some((e) => (
          e.assumedUsefulMissingSlots > 0 && e.upgradeChance >= 1
        ))
      ) {
        maybeUpgrade100 = countTowardsGroup(maybeUpgrade100, a.artifactData, false);
      } else if (
        // MAYBE_UPGRADE_30
        relevantEvaluationsOnSet.some((e) => (
          e.assumedUsefulMissingSlots > 0 && e.upgradeChance >= 0.3
        ))
      ) {
        maybeUpgrade30 = countTowardsGroup(maybeUpgrade30, a.artifactData, false);
      } else if (relevantEvaluationsOnSet.some((e) => e.upgradeChance >= 1)) {
        upgrade100 = countTowardsGroup(upgrade100, a.artifactData, false);
      } else if (relevantEvaluationsOnSet.some((e) => e.upgradeChance >= 0.75)) {
        upgrade75 = countTowardsGroup(upgrade75, a.artifactData, false);
      } else if (relevantEvaluationsOnSet.some((e) => e.upgradeChance >= 0.5)) {
        upgrade50 = countTowardsGroup(upgrade50, a.artifactData, false);
      } else if (
        !hasCharacterWithoutArtifactOnSet
        && !relevantEvaluationsOnSet.some((e) => e.upgradeChance <= 0.3)
      ) {
        lowChance = countTowardsGroup(lowChance, a.artifactData, false);
      }

      // Evaluate offpiece with relevant Evaluations
      const relevantBuildsOffpiece = getBuildsRelevantForArtifact(a.artifactData, builds, false);
      const relevantEvaluationsOffpiece = filterEvaluationsByBuilds(
        relevantBuildsOffpiece,
        a.buildEvaluations,
      );

      if (relevantEvaluationsOffpiece.some((e) => !e.upgradeIsRelevant)) {
        // There is at least one build that isn't wearing a relevant artifact
      } else if (
        // NO_UPGRADE_OFFPIECE
        relevantEvaluationsOffpiece.length === 0
        || !relevantEvaluationsOffpiece.some((e) => e.upgradePotential >= 0)
      ) {
        noUpgradeOffpiece = countTowardsGroup(noUpgradeOffpiece, a.artifactData, true);
      } else if (!relevantEvaluationsOffpiece.some((e) => e.upgradeChance <= 0.3)
      ) {
        lowChanceOffpiece = countTowardsGroup(lowChanceOffpiece, a.artifactData, true);
      }
    }
  });

  return {
    NO_UPGRADE: sortArtifactGroupCounter(noUpgrade),
    MAYBE_UPGRADE_100: sortArtifactGroupCounter(maybeUpgrade100),
    MAYBE_UPGRADE_30: sortArtifactGroupCounter(maybeUpgrade30),
    UPGRADE100: sortArtifactGroupCounter(upgrade100),
    UPGRADE75: sortArtifactGroupCounter(upgrade75),
    UPGRADE50: sortArtifactGroupCounter(upgrade50),
    LOWCHANCE_UPGRADE: sortArtifactGroupCounter(lowChance),

    NO_UPGRADE_OFFPIECE: sortArtifactGroupCounter(noUpgradeOffpiece),
    LOWCHANCE_UPGRADE_OFFPIECE: sortArtifactGroupCounter(lowChanceOffpiece),
  };
}

// ----------------------------------------------------------------------------

export function countArtifactsByBuilds(artifacts, builds) {
  let groupCounts = {};

  artifacts.forEach((a) => {
    const relevantBuildsOnSet = getBuildsRelevantForArtifact(a.artifactData, builds, true);
    const relevantEvaluationsOnSet = filterEvaluationsByBuilds(
      relevantBuildsOnSet,
      a.buildEvaluations,
    );
    groupCounts = countTowardsCustomGroup(
      groupCounts,
      a.artifactData,
      a.artifactData.slotKey !== 'flower' && a.artifactData.slotKey !== 'plume',
      false,
      relevantEvaluationsOnSet.length === 0 ? 0 : 1 / relevantEvaluationsOnSet.length,
    );
  });

  groupCounts.totalCount = -1;

  return sortArtifactGroupCounter(groupCounts);
}
