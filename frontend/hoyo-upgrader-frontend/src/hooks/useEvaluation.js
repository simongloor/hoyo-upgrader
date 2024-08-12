/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { getRelevantSubstatsOfArtifact } from '../data/substats';
import {
  getArtifactTier,
  getBuildQualitySortValue,
  getUpgradeChance,
  getUpgradePotential,
} from '../data/evaluation';

// we want to evaluate all artifacts for their relevant builds
// this includes:
//  - relevantSubstats: the substats that are relevant for the builds (e.g. atk_, wastedSubstats...)
//  - sortValue: the value to sort the artifacts by in regards to the build
//  - tier: the tier of the artifact for the build
function evaluateArtifact(artifact, build) {
  // console.log(artifact, build);
  const {
    relevantSubstats,
    assumedUsefulMissingSlots,
  } = getRelevantSubstatsOfArtifact(artifact, build);

  return {
    artifactWearer: build.artifactWearer,
    buildOwner: build.buildOwner,
    relevantSubstats,
    assumedUsefulMissingSlots,
    sortValue: getBuildQualitySortValue(relevantSubstats),
    tier: getArtifactTier(artifact, relevantSubstats),
  };
}

//---------------------------------------------------------

function evaluateArtifactForAllBuilds(artifact, builds) {
  let relevantBuilds = builds;

  // builds that don't want other mainstats should not be generated unless it's already equipped
  if (artifact.slotKey !== 'flower' && artifact.slotKey !== 'plume') {
    relevantBuilds = relevantBuilds.filter((build) => (
      artifact.location === build.artifactWearer
      || build.mainstats[artifact.slotKey].includes(artifact.mainStatKey)
    ));
  }

  return relevantBuilds.map((build) => evaluateArtifact(artifact, build));
}

function findCompetingArtifact(artifact, artifactWearer, evaluatedArtifacts) {
  return evaluatedArtifacts.find((a) => (
    a.artifactData.location
    && a.artifactData.location === artifactWearer
    && a.artifactData.slotKey === artifact.artifactData.slotKey
  ));
}

function identifyUpgradePotentials(artifact, evaluatedArtifacts) {
  // console.log(artifact, evaluatedArtifacts);
  return {
    ...artifact,
    // go through all builds and add the upgradePotential
    buildEvaluations: artifact.buildEvaluations.map((evaluation) => {
      const competingArtifact = findCompetingArtifact(
        artifact,
        evaluation.artifactWearer,
        evaluatedArtifacts,
      );
      const upgradePotential = getUpgradePotential(
        evaluation.relevantSubstats,
        competingArtifact,
        artifact.artifactData.rarity,
      );
      const upgradeChance = getUpgradeChance(
        evaluation,
      );
      return {
        ...evaluation,
        upgradePotential,
        upgradeChance,
      };
    }),
  };
}

// ---------------------------------------------------------

export default function useEvaluation(artifacts, builds) {
  const [evaluatedArtifacts, setEvaluatedArtifacts] = useState({
    ...artifacts,
    isEvaluated: false,
    asList: artifacts.asList.map((artifact) => ({
      artifactData: artifact,
      buildEvaluations: [],
    })),
  });
  // console.log(artifacts);

  useEffect(() => {
    if (artifacts && builds && artifacts.asList.length > 0 && builds.length > 0) {
      // console.log('useEvaluation');
      // console.log(artifacts, builds);

      // // measure time
      // const t0 = performance.now();

      // evaluate as far as possible to generate relevant substats
      const newEvaluatedArtifacts = [...artifacts.asList].map((artifact) => ({
        artifactData: artifact,
        buildEvaluations: evaluateArtifactForAllBuilds(artifact, builds),
      }));

      // compare artifacts to find upgradePotentials
      newEvaluatedArtifacts.forEach((artifact, iArtifact) => {
        newEvaluatedArtifacts[iArtifact] = identifyUpgradePotentials(
          artifact,
          newEvaluatedArtifacts,
        );
      });

      // sort evaluations by sortValue
      newEvaluatedArtifacts.forEach((artifact) => {
        artifact.buildEvaluations.sort((a, b) => a.sortValue - b.sortValue);
      });

      // sort artifacts by sortValue of first buildEvaluation
      newEvaluatedArtifacts.sort((a, b) => (
        (a.buildEvaluations[0] ? a.buildEvaluations[0].sortValue : 20)
        - (b.buildEvaluations[0] ? b.buildEvaluations[0].sortValue : 20)
      ));

      // apply
      setEvaluatedArtifacts((state) => ({
        ...state,
        isEvaluated: true,
        asList: newEvaluatedArtifacts,
      }));

      // // measure time
      // const t1 = performance.now();
      // console.log('useEvaluation took', t1 - t0, 'ms.');
    }
  }, [artifacts, builds]);

  // console.log(evaluatedArtifacts);
  return evaluatedArtifacts;
}
