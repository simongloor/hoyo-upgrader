export function toggleArtifactSetFilter(set) {
  return ({
    type: 'TOGGLE_ARTIFACT_SET',
    payload: { set },
  });
}
export function toggleArtifactPieceFilter(piece) {
  return ({
    type: 'TOGGLE_ARTIFACT_PIECE',
    payload: { piece },
  });
}
export function toggleCharacterFilter(character, build) {
  return ({
    type: 'TOGGLE_CHARACTER',
    payload: { character, build },
  });
}
