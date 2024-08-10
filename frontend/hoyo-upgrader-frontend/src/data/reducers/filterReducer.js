/* eslint-disable default-param-last */

const emptyFilter = {
  // character
  artifactWearer: null, // "KujouSara"
  buildOwner: null, // "RaidenShogun"
  characterSets: null, // ["Gilded..., Paradise..."]
  // set
  specificSet: null, // "Gilded..."
  filterCharacterSets: false, // specific set enabled?
  filterSpecificSet: false, // build sets enabled?
  // piece
  specificPiece: 'flower', // "flower"
  // mainstat
  mainstat: {
    sands: null,
    goblet: null,
    circlet: null,
  },
  showOffpieces: false,
};

const filterReducer = (
  state = { ...emptyFilter },
  action,
) => {
  const newState = state;
  newState.highlightArtifactKeys = [];
  switch (action.type) {
    case 'TOGGLE_ARTIFACT_SPECIFIC_PIECE': {
      const enableFilter = state.specificPiece !== action.payload.specificPiece;

      if (!enableFilter) {
        newState.showOffpieces = false;
      }

      return {
        ...newState,
        specificPiece: enableFilter ? action.payload.specificPiece : null,
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
      const enableFilter = (state.artifactWearer !== action.payload.artifactWearer);

      // can't filter for both build sets and specific sets
      if (enableFilter && !state.filterSpecificSet) {
        newState.filterCharacterSets = enableFilter;
      } else if (!enableFilter) {
        newState.filterCharacterSets = false;
      }

      // apply data
      return enableFilter ? {
        ...newState,
        artifactWearer: action.payload.artifactWearer,
        buildOwner: action.payload.buildOwner,
        characterSets: action.payload.characterSets,
      } : {
        ...newState,
        artifactWearer: null,
        buildOwner: null,
        characterSets: null,
      };
    }
    case 'TOGGLE_MAINSTAT': {
      return {
        ...newState,
        mainstat: {
          ...state.mainstat,
          [action.payload.piece]: state.mainstat[action.payload.piece] === action.payload.stat
            ? null : action.payload.stat,
        },
      };
    }
    case 'TOGGLE_SHOW_OFFPIECES': {
      return {
        ...newState,
        showOffpieces: !state.showOffpieces,
      };
    }
    case 'APPLY_FILTER': {
      return {
        ...emptyFilter,
        ...action.payload.filter,
        mainstat: {
          ...emptyFilter.mainstat,
          ...action.payload.filter.mainstat,
        },
      };
    }
    default: {
      return state;
    }
  }
};
export default filterReducer;
