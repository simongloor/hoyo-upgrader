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
    };
  } else {
    newCounter[group].count += 1;
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

function getEvaluationsRelevantArtifact(builds, evaluations) {
  return evaluations.filter((evaluation) => (
    builds.some((build) => build.artifactWearer === evaluation.artifactWearer)
  ));
}

export function countUselessArtifacts(artifacts, builds) {
  let uselessArtifactsByGroup = {};

  artifacts.forEach((a) => {
    let relevantBuilds = [];
    switch (a.artifactData.slotKey) {
      case 'flower':
      case 'plume': {
        relevantBuilds = getBuildsRelevantForFixedArtifact(a.artifactData, builds);
        break;
      }
      case 'sands':
      case 'circlet': {
        relevantBuilds = getBuildsRelevantForMainstatArtifact(a.artifactData, builds);
        break;
      }
      case 'goblet': {
        relevantBuilds = getBuildsRelevantForOffpieceArtifact(a.artifactData, builds);
        break;
      }
      default: {
        break;
      }
    }

    const relevantEvaluations = getEvaluationsRelevantArtifact(
      relevantBuilds,
      a.buildEvaluations,
    );
    // console.log(relevantEvaluations);
    if (!relevantEvaluations.some((e) => e.upgradePotential >= 0)) {
      uselessArtifactsByGroup = countTowardsGroup(uselessArtifactsByGroup, a.artifactData);
    }
  });

  return sortArtifactGroupCounter(uselessArtifactsByGroup);
}