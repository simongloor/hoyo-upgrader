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
