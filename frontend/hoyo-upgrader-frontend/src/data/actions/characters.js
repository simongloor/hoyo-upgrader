/* eslint-disable no-unused-vars */
export function loadCharacters(exampleJsonData) {
  return ({
    type: 'LOAD_CHARACTERS',
    payload: { exampleJsonData },
  });
}
export function updateCharacters(buildData) {
  return ({
    type: 'UPDATE_CHARACTERS',
    payload: { buildData },
  });
}
