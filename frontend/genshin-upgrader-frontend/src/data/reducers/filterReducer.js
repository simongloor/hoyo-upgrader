/* eslint-disable default-param-last */

const filterReducer = (
  state = {
    character: null,
    set: null,
    piece: null,
  },
  action,
) => {
  const newState = state;
  switch (action.type) {
    case 'APPLY_FILTER_ARTIFACT': {
      return {
        ...newState,
        character: action.payload.character ? action.payload.character : newState.character,
        set: action.payload.set ? action.payload.set : newState.set,
        piece: action.payload.piece ? action.payload.piece : newState.piece,
      };
    }
    case 'CLEAR_FILTER_ARTIFACT': {
      return {
        character: null,
        set: null,
        piece: null,
      };
    }
    default: {
      return state;
    }
  }
};
export default filterReducer;
