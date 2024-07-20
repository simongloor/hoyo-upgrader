/* eslint-disable default-param-last */

const filterReducer = (
  state = {
    // character
    characterName: null, // "RaidenShogun"
    characterBuildName: null, // "CRIT"
    characterSets: null, // ["Gilded..., Paradise..."]
    // set
    specificSet: null, // "Gilded..."
    filterCharacterSets: false, // specific set enabled?
    filterSpecificSet: false, // build sets enabled?
    // piece
    specificPiece: null, // "flower"
  },
  action,
) => {
  const newState = state;
  switch (action.type) {
    case 'TOGGLE_ARTIFACT_SPECIFIC_PIECE': {
      return {
        ...newState,
        specificPiece: state.specificPiece === action.payload.piece ? null : action.payload.piece,
      };
    }
    case 'TOGGLE_ARTIFACT_SPECIFIC_SET': {
      const enableSpecificSetFilter = !state.filterSpecificSet
        || (state.specificSet && state.specificSet.toString())
          === (action.payload.sets && action.payload.sets.toString());

      // can't filter for both build sets and specific sets
      newState.filterSpecificSet = enableSpecificSetFilter;
      if (enableSpecificSetFilter) {
        newState.filterCharacterSets = false;
      }

      // apply data
      return {
        ...newState,
        specificSet: enableSpecificSetFilter ? action.payload.sets : null,
      };
    }
    case 'TOGGLE_ARTIFACT_CHARACTER_SETS': {
      return {
        ...newState,
        filterCharacterSets: !state.filterCharacterSets,
      };
    }
    case 'TOGGLE_CHARACTER': {
      const enableCharacterSetsFilter = !state.filterCharacterSets
        || (state.characterName !== action.payload.character
          && state.characterBuildName !== action.payload.buildName);

      // can't filter for both build sets and specific sets
      newState.filterCharacterSets = enableCharacterSetsFilter;
      if (enableCharacterSetsFilter) {
        newState.filterSpecificSet = false;
        newState.specificSet = null;
      }

      // apply data
      return {
        ...newState,
        characterName: enableCharacterSetsFilter ? action.payload.character : null,
        characterBuildName: enableCharacterSetsFilter ? action.payload.buildName : null,
        characterSets: enableCharacterSetsFilter ? action.payload.sets : state.characterSets,
      };
    }
    default: {
      return state;
    }
  }
};
export default filterReducer;
