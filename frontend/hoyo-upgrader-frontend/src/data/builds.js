/* eslint-disable import/prefer-default-export */

import paths from './paths';

// check who is free and who is busy by whom
export function getWearerStates(builds) {
  return {
    busy: builds.reduce((acc, build) => {
      acc[build.artifactWearer] = build.buildOwner;
      return acc;
    }, {}),
    free: Object.keys(paths.character).reduce((acc, character) => {
      if (!builds.some((b) => b.artifactWearer === character)) {
        acc.push(character);
      }
      return acc;
    }, []),
  };
}

export function getEquippedArtifacts(artifactWearer, artifactsAsList) {
  // console.log(artifactsAsList[0]);
  const artifacts = artifactsAsList.filter((artifact) => (
    artifact.artifactData.location === artifactWearer));

  const artifactsBySlot = artifacts.reduce((acc, artifact) => {
    acc[artifact.artifactData.slotKey] = artifact;
    return acc;
  }, {
    flower: null,
    plume: null,
    sands: null,
    goblet: null,
    circlet: null,
  });

  return artifactsBySlot;
}
