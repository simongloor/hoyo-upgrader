export function toggleSpecificPieceFilter(specificPiece) {
  return ({
    type: 'TOGGLE_ARTIFACT_SPECIFIC_PIECE',
    payload: { specificPiece },
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
export function toggleCharacterFilter(characterName, characterBuildName, characterSets) {
  return ({
    type: 'TOGGLE_CHARACTER',
    payload: { characterName, characterBuildName, characterSets },
  });
}
export function toggleMainstatFilter(piece, stat) {
  return ({
    type: 'TOGGLE_MAINSTAT',
    payload: { piece, stat },
  });
}
export function toggleShowOffpieces() {
  return ({
    type: 'TOGGLE_SHOW_OFFPIECES',
  });
}
