/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getRelevantSubstatsOfArtifact } from '../data/substats';
import { getArtifactTier, getBuildQualitySortValue, getUpgradePotential } from '../data/evaluation';

// we want to evaluate all artifacts for their relevant builds
// this includes:
//  - relevantSubstats: the substats that are relevant for the builds (e.g. atk_, wastedSubstats...)
//  - sortValue: the value to sort the artifacts by in regards to the build
//  - tier: the tier of the artifact for the build
function evaluateArtifact(artifact, build) {
  // console.log(artifact, build);
  const relevantSubstats = getRelevantSubstatsOfArtifact(artifact, build);
  return {
    relevantSubstats,
    sortValue: getBuildQualitySortValue(build, relevantSubstats),
    tier: getArtifactTier(artifact, relevantSubstats),
  };
}

//---------------------------------------------------------

// function evaluateArtifactsForBuild(artifacts, build) {
//   return Object.keys(artifacts).reduce((acc, key) => {
//     acc[key] = evaluateArtifact(artifacts[key], build);
//     return acc;
//   }, {});
// }

function evaluateArtifactForAllBuilds(artifact, builds) {
  // we need to evaluate all artifacts for all builds to support all filter options
  // even flowers can be viewed unfiltered (by slot with offpieces)
  return Object.keys(builds).reduce((acc, key) => {
    acc[builds[key].artifactWearer] = evaluateArtifact(
      artifact,
      builds[key],
    );
    return acc;
  }, {});
}

function findCompetingArtifact(artifact, evaluatedArtifacts) {
  return evaluatedArtifacts.find((a) => (
    a.artifactData.location
    && a.artifactData.location === artifact.artifactData.location
    && a.artifactData.slotKey === artifact.artifactData.slotKey
  ));
}

function identifyUpgradePotentials(artifact, evaluatedArtifacts) {
  // console.log(artifact, evaluatedArtifacts);
  return {
    ...artifact,
    // go through all builds and add the upgradePotential
    buildEvaluations: Object.keys(artifact.buildEvaluations).reduce((acc, wearer) => ({
      ...acc,
      [wearer]: {
        ...artifact.buildEvaluations[wearer],
        upgradePotential: getUpgradePotential(
          artifact.buildEvaluations[wearer].relevantSubstats,
          findCompetingArtifact(artifact, evaluatedArtifacts),
        ),
      },
    }), {}),
  };
}

export default function useEvaluation(artifacts, builds) {
  const [evaluatedArtifacts, setEvaluatedArtifacts] = useState({ ...artifacts });

  useEffect(() => {
    if (artifacts && builds) {
      // console.log(artifacts, builds);

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

      // apply
      setEvaluatedArtifacts((state) => ({
        ...state,
        asList: newEvaluatedArtifacts,
      }));
    }
  }, [artifacts, builds]);

  console.log(evaluatedArtifacts);
  return evaluatedArtifacts;
}
