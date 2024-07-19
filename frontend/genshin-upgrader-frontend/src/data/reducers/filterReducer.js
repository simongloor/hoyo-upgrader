/* eslint-disable default-param-last */

const filterReducer = (
  state = {
    character: null,
    build: null,
    sets: null,
    piece: null,
    set: null, // deprecated
  },
  action,
) => {
  const newState = state;
  switch (action.type) {
    case 'TOGGLE_ARTIFACT_SETS': {
      return {
        ...newState,
        sets: state.sets.toString() === action.payload.sets.toString() ? null : action.payload.sets,
      };
    }
    case 'TOGGLE_ARTIFACT_PIECE': {
      return {
        ...newState,
        piece: state.piece === action.payload.piece ? null : action.payload.piece,
      };
    }
    case 'TOGGLE_CHARACTER': {
      const alreadySelected = state.character === action.payload.character
      && state.build === action.payload.buildName;
      return {
        ...newState,
        character: alreadySelected ? null : action.payload.character,
        build: alreadySelected ? null : action.payload.buildName,
        sets: alreadySelected ? state.sets : action.payload.sets,
      };
    }
    // deprecated
    case 'TOGGLE_ARTIFACT_SET': {
      return {
        ...newState,
        set: state.set === action.payload.set ? null : action.payload.set,
      };
    }
    default: {
      return state;
    }
  }
};
export default filterReducer;
