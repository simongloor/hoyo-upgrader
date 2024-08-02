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
export function toggleCharacterFilter(characterName, characterSets) {
  return ({
    type: 'TOGGLE_CHARACTER',
    payload: { characterName, characterSets },
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
export function applyFilter(filter) {
  return ({
    type: 'APPLY_FILTER',
    payload: { filter },
  });
}
