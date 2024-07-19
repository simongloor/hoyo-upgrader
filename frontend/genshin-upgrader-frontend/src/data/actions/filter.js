export function toggleArtifactSetsFilter(sets) {
  return ({
    type: 'TOGGLE_ARTIFACT_SETS',
    payload: { sets },
  });
}
export function toggleArtifactPieceFilter(piece) {
  return ({
    type: 'TOGGLE_ARTIFACT_PIECE',
    payload: { piece },
  });
}
export function toggleCharacterFilter(character, buildName, sets) {
  return ({
    type: 'TOGGLE_CHARACTER',
    payload: { character, buildName, sets },
  });
}

// deprecated
export function toggleArtifactSetFilter(set) {
  return ({
    type: 'TOGGLE_ARTIFACT_SET',
    payload: { set },
  });
}
