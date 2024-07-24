export function loadArtifacts(exampleJsonData) {
  return ({
    type: 'LOAD_ARTIFACTS',
    payload: { exampleJsonData },
  });
}

export function updateArtifacts(jsonData) {
  return ({
    type: 'UPDATE_ARTIFACTS',
    payload: { jsonData },
  });
}
