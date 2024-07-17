export default function applyArtifactFilter(character, set, piece) {
  return ({
    type: 'APPLY_FILTER_ARTIFACT',
    payload: { character, set, piece },
  });
}
export function clearArtifactFilter() {
  return ({
    type: 'CLEAR_FILTER_ARTIFACT',
  });
}
