/* eslint-disable default-param-last */

const filterReducer = (
  state = {
    character: null,
    build: null,
    set: null,
    piece: null,
  },
  action,
) => {
  const newState = state;
  switch (action.type) {
    case 'TOGGLE_ARTIFACT_SET': {
      return {
        ...newState,
        set: state.set === action.payload.set ? null : action.payload.set,
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
        && state.build === action.payload.build;
      return {
        ...newState,
        character: alreadySelected ? null : action.payload.character,
        build: alreadySelected ? null : action.payload.build,
      };
    }
    default: {
      return state;
    }
  }
};
export default filterReducer;
