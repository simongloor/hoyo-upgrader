/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */

export function getBuildsBySets(characterData) {
  const builds = {};
  Object.keys(characterData).forEach((characterName) => {
    characterData[characterName].forEach((build) => {
      const { sets } = build;
      sets.forEach((set) => {
        if (!builds[set]) {
          builds[set] = [];
        }
        builds[set].push({
          characterName,
          ...build,
        });
      });
    });
  });

  return builds;
}

export function getBuildsCompact(characterData) {
  const builds = [];
  Object.keys(characterData).forEach((characterName) => {
    characterData[characterName].forEach((build) => {
      builds.push({
        characterName,
        ...build,
      });
    });
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

export function getBuildIndex(characterData, characterName, buildName) {
  return characterData[characterName]
    .findIndex((build) => build.substats.join('-') === buildName);
}
