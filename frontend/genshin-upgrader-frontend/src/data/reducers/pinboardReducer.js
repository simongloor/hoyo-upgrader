/* eslint-disable default-param-last */

const pinboardReducer = (
  state = {
    pinnedArtifactData: null,
  },
  action,
) => {
  const newState = state;
  switch (action.type) {
    case 'TOGGLE_PINNED_ARTIFACT': {
      // compare as json string
      if (
        JSON.stringify(newState.pinnedArtifactData)
        === JSON.stringify(action.payload.artifactData)
      ) {
        return {
          ...newState,
          pinnedArtifactData: null,
        };
      }
      return {
        ...newState,
        pinnedArtifactData: action.payload.artifactData,
      };
    }
    default: {
      return state;
    }
  }
};
export default pinboardReducer;
