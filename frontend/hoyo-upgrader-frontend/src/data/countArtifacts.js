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
) {
  const group = `${offpieces ? 'any' : artifactData.set}-${artifactData.slotKey}-${artifactData.mainStatKey}`;
  const newCounter = counter;
  if (!counter[group]) {
    newCounter[group] = {
      piece: artifactData.slotKey,
      set: offpieces ? artifactData.mainStatKey : artifactData.set,
      stat: useStat ? artifactData.mainStatKey : '',
      offpieces,
      count: 1,
      filterStrings: [artifactData.key],
    };
  } else {
    newCounter[group].count += 1;
    newCounter[group].filterStrings.push(artifactData.key);
  }
  return newCounter;
}

export function countTowardsGroup(counter, artifactData) {
  return countTowardsCustomGroup(
    counter,
    artifactData,
    artifactData.slotKey !== 'flower' && artifactData.slotKey !== 'plume',
    artifactData.slotKey === 'goblet',
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

function getBuildsRelevantForFixedArtifact(artifact, builds) {
  return builds.filter((build) => (
    build.sets.includes(artifact.setKey)
  ));
}

function getBuildsRelevantForMainstatArtifact(artifact, builds) {
  return builds.filter((build) => (
    build.mainstats[artifact.slotKey].includes(artifact.mainStatKey)
    && build.sets.includes(artifact.setKey)
  ));
}

function getBuildsRelevantForOffpieceArtifact(artifact, builds) {
  return builds.filter((build) => (
    build.mainstats[artifact.slotKey].includes(artifact.mainStatKey)
  ));
}

function filterEvaluationsByBuilds(builds, evaluations) {
  return evaluations.filter((evaluation) => (
    builds.some((build) => build.artifactWearer === evaluation.artifactWearer)
  ));
}

export function getBuildsRelevantForArtifact(artifactData, builds) {
  let relevantBuilds = [];
  switch (artifactData.slotKey) {
    case 'flower':
    case 'plume': {
      relevantBuilds = getBuildsRelevantForFixedArtifact(artifactData, builds);
      break;
    }
    case 'sands':
    case 'circlet': {
      relevantBuilds = getBuildsRelevantForMainstatArtifact(artifactData, builds);
      break;
    }
    case 'goblet': {
      relevantBuilds = getBuildsRelevantForOffpieceArtifact(artifactData, builds);
      break;
    }
    default: {
      break;
    }
  }
  return relevantBuilds;
}

// export function countArtifactsWithoutUpgrade(artifacts, builds) {
//   let artifactsByGroup = {};

//   artifacts.forEach((a) => {
//     const relevantBuilds = getBuildsRelevantForArtifact(a.artifactData, builds);

//     const relevantEvaluations = filterEvaluationsByBuilds(
//       relevantBuilds,
//       a.buildEvaluations,
//     );
//     // console.log(relevantEvaluations);
//     if (!relevantEvaluations.some((e) => e.upgradePotential >= 0)) {
//       artifactsByGroup = countTowardsGroup(artifactsByGroup, a.artifactData);
//       // console.log(uselessArtifactsByGroup);
//     }
//   });

//   return sortArtifactGroupCounter(artifactsByGroup);
// }

// export function countArtifactsNotNeeded(artifacts, builds) {
//   let artifactsByGroup = {};

//   artifacts.forEach((a) => {
//     const relevantBuilds = getBuildsRelevantForArtifact(a.artifactData, builds);
//     if (relevantBuilds.length === 0) {
//       artifactsByGroup = countTowardsGroup(artifactsByGroup, a.artifactData);
//     }
//   });

//   return sortArtifactGroupCounter(artifactsByGroup);
// }

export function countArtifactsByQuality(artifacts, builds) {
  let notNeeded = {};
  let noUpgrade = {};
  let upgrade100 = {};
  let upgrade75 = {};
  let upgrade50 = {};
  let under30 = {};

  artifacts.forEach((a) => {
    const relevantBuilds = getBuildsRelevantForArtifact(a.artifactData, builds);

    const relevantEvaluations = filterEvaluationsByBuilds(
      relevantBuilds,
      a.buildEvaluations,
    );

    if (!a.artifactData.location) {
      if (relevantBuilds.length === 0) {
        notNeeded = countTowardsGroup(notNeeded, a.artifactData);
      } else if (!relevantEvaluations.some((e) => e.upgradePotential >= 0)) {
        noUpgrade = countTowardsGroup(noUpgrade, a.artifactData);
      } else if (relevantEvaluations.some((e) => e.upgradeChance >= 1)) {
        upgrade100 = countTowardsGroup(upgrade100, a.artifactData);
      } else if (relevantEvaluations.some((e) => e.upgradeChance >= 0.75)) {
        upgrade75 = countTowardsGroup(upgrade75, a.artifactData);
      } else if (relevantEvaluations.some((e) => e.upgradeChance >= 0.5)) {
        upgrade50 = countTowardsGroup(upgrade50, a.artifactData);
      } else if (!relevantEvaluations.some((e) => e.upgradeChance >= 0.3)) {
        under30 = countTowardsGroup(under30, a.artifactData);
      }
    }
  });

  return {
    NOT_NEEDED: sortArtifactGroupCounter(notNeeded),
    NO_UPGRADE: sortArtifactGroupCounter(noUpgrade),
    UPGRADE100: sortArtifactGroupCounter(upgrade100),
    UPGRADE75: sortArtifactGroupCounter(upgrade75),
    UPGRADE50: sortArtifactGroupCounter(upgrade50),
    UNDER30CHANCE_UPGRADE: sortArtifactGroupCounter(under30),
  };
}
