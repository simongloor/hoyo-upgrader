/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */

export function getBuildsBySets(characterData) {
  const builds = {};
  characterData.forEach((build) => {
    const { sets } = build;
    sets.forEach((set) => {
      if (!builds[set]) {
        builds[set] = [];
      }
      builds[set].push({
        ...build,
      });
    });
  });

  return builds;
}

export function getEmptyBuild() {
  return {
    artifactWearer: '',
    buildOwner: '',
    sets: [],
    mainstats: {
      sands: [],
      goblet: [],
      circlet: [],
    },
    substats: [],
  };
}
