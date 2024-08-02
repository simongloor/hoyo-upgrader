/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */

export function getBuildsBySets(characterData) {
  const builds = {};
  Object.keys(characterData).forEach((artifactWearer) => {
    if (characterData[artifactWearer]) {
      const { sets } = characterData[artifactWearer];
      sets.forEach((set) => {
        if (!builds[set]) {
          builds[set] = [];
        }
        builds[set].push({
          ...characterData[artifactWearer],
        });
      });
    }
  });

  return builds;
}

export function getBuildsCompact(characterData) {
  const builds = [];
  Object.keys(characterData).forEach((artifactWearer) => {
    if (characterData[artifactWearer]) {
      builds.push({
        ...characterData[artifactWearer],
      });
    }
  });

  return builds;
}

export function getEmptyBuild() {
  return {
    sets: [],
    mainstats: {
      sands: [],
      goblet: [],
      circlet: [],
    },
    substats: [],
  };
}
