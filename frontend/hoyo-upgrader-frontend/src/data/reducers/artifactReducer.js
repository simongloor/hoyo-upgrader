/* eslint-disable no-unused-vars */
/* eslint-disable default-param-last */

import { countArtifactsByGroup, countArtifactsBySet } from '../countArtifacts';
import { loadStateFromStorage, saveStateToStorage } from '../localStorage';
import paths from '../paths';
import { countSubstats } from '../substats';

function processJson(jsonData) {
  if (jsonData.artifacts) {
    return jsonData.artifacts
      .filter((artifact) => artifact.rarity >= 4)
      .map((artifact) => ({
        ...artifact,
        set: artifact.setKey,
        piece: artifact.slotKey,
        substatCounts: countSubstats(artifact),
      }));
  }
  return [];
}

const artifactReducer = (
  state = {
    asList: [],
    // byWearer: {},
    counts: {
      sortedSets: [],
      sets: {},
    },
    groupCounts: {
      sortedGroups: [],
      groups: {},
    },
  },
  action,
) => {
  const newState = { ...state };

  switch (action.type) {
    case 'LOAD_ARTIFACTS': {
      // prepare data to be processed
      let newJsonData = action.payload.exampleJsonData;

      // ensure that there is always data in the local storage
      const localJsonData = loadStateFromStorage(
        paths.localStorage.artifactsJson,
        {},
        '',
      );

      // no local data yet?
      if (!localJsonData.data) {
        saveStateToStorage(
          paths.localStorage.artifactsJson,
          {
            data: JSON.stringify(action.payload.exampleJsonData, 0, 2),
          },
        );
      } else {
        newJsonData = JSON.parse(localJsonData.data);
      }

      // process
      newState.asList = processJson(newJsonData);
      newState.counts = countArtifactsBySet(newState.asList);
      newState.groupCounts = countArtifactsByGroup(newState.asList);
      return newState;
    }
    case 'UPDATE_ARTIFACTS': {
      // save to local storage
      saveStateToStorage(
        paths.localStorage.artifactsJson,
        {
          data: JSON.stringify(action.payload.jsonData, 0, 2),
        },
      );
      const saved = loadStateFromStorage(
        paths.localStorage.artifactsJson,
        {},
        '',
      );
      // console.log('loaded from local storage', saved.data);

      // process
      newState.asList = processJson(action.payload.jsonData);
      newState.counts = countArtifactsBySet(newState.asList);
      newState.groupCounts = countArtifactsByGroup(newState.asList);
      return newState;
    }
    default: {
      return state;
    }
  }
};
export default artifactReducer;
