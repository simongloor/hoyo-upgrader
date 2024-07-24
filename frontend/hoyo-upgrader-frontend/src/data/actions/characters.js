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
