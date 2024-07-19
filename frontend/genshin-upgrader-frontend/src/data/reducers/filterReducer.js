/* eslint-disable default-param-last */

const filterReducer = (
  state = {
    character: null,
    characterSets: null,
    build: null,
    sets: null,
    piece: null,
  },
  action,
) => {
  const newState = state;
  switch (action.type) {
    case 'TOGGLE_ARTIFACT_SETS': {
      return {
        ...newState,
        sets: (state.sets && state.sets.toString())
          === (action.payload.sets && action.payload.sets.toString())
          ? null : action.payload.sets,
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
        characterSets: alreadySelected ? state.characterSets : action.payload.sets,
      };
    }
    default: {
      return state;
    }
  }
};
export default filterReducer;
