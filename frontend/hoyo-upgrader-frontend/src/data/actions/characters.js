/* eslint-disable no-unused-vars */
export function loadCharacters(exampleJsonData) {
  return ({
    type: 'LOAD_CHARACTERS',
    payload: { exampleJsonData },
  });
}
export function updateCharacters(jsonData) {
  return ({
    type: 'UPDATE_CHARACTERS',
    payload: { jsonData },
  });
}
export function getBuildKey(build) {
  return `${build.characterName}-${build.index}`;
}
