export default function loadGoodArtifacts(jsonData) {
  return ({
    type: 'LOAD_ARTIFACTS_GOOD',
    payload: { jsonData },
  });
}
