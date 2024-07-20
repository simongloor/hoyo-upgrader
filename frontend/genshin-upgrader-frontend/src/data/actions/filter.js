export function toggleSpecificPieceFilter(piece) {
  return ({
    type: 'TOGGLE_ARTIFACT_SPECIFIC_PIECE',
    payload: { piece },
  });
}
export function toggleSpecificSetFilter(specificSet) {
  return ({
    type: 'TOGGLE_ARTIFACT_SPECIFIC_SET',
    payload: { specificSet },
  });
}
export function toggleCharacterSetsFilter() {
  return ({
    type: 'TOGGLE_ARTIFACT_CHARACTER_SETS',
  });
}
export function toggleCharacterFilter(characterName, buildName, characterSets) {
  return ({
    type: 'TOGGLE_CHARACTER',
    payload: { characterName, buildName, characterSets },
  });
}
