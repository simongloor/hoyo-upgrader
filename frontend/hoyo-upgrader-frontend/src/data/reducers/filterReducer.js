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
      const enableFilter = state.specificSet !== action.payload.specificSet;

      // can't filter for both build sets and specific sets
      newState.filterSpecificSet = enableFilter;
      if (enableFilter) {
        newState.filterCharacterSets = false;
      }

      // apply data
      return {
        ...newState,
        specificSet: enableFilter ? action.payload.specificSet : null,
      };
    }
    case 'TOGGLE_ARTIFACT_CHARACTER_SETS': {
      // can't filter for both build sets and specific sets
      if (!state.filterCharacterSets) {
        newState.filterSpecificSet = false;
        newState.specificSet = null;
      }

      // apply data
      return {
        ...newState,
        filterCharacterSets: !state.filterCharacterSets,
      };
    }
    case 'TOGGLE_CHARACTER': {
      const enableFilter = (state.characterName !== action.payload.characterName
          || state.characterBuildName !== action.payload.characterBuildName);

      // can't filter for both build sets and specific sets
      if (enableFilter && !state.filterSpecificSet) {
        newState.filterCharacterSets = enableFilter;
      } else if (!enableFilter) {
        newState.filterCharacterSets = false;
      }

      // apply data
      return enableFilter ? {
        ...newState,
        characterName: action.payload.characterName,
        characterBuildName: action.payload.characterBuildName,
        characterSets: action.payload.characterSets,
      } : {
        ...newState,
        characterName: null,
        characterBuildName: null,
        characterSets: null,
      };
    }
    default: {
      return state;
    }
  }
};
export default filterReducer;
