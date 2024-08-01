/* eslint-disable no-unused-vars */
/* eslint-disable default-param-last */

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

function sortDataByCharacter(artifactData) {
  const byCharacter = {};
  artifactData.forEach((artifact) => {
    if (artifact.location) {
      if (!byCharacter[artifact.location]) {
        byCharacter[artifact.location] = {
          flower: null,
          plume: null,
          sands: null,
          goblet: null,
          circlet: null,
        };
      }
      byCharacter[artifact.location][artifact.slotKey] = artifact;
    }
  });
  return byCharacter;
}

function countArtifactsBySet(artifactData) {
  const counts = {
    sortedSets: [],
    sets: {},
  };
  artifactData.forEach((artifact) => {
    // Count sets
    if (!counts.sets[artifact.set]) {
      counts.sets[artifact.set] = {
        total: 0,
        flower: 0,
        plume: 0,
        sands: 0,
        goblet: 0,
        circlet: 0,
      };
    }
    counts.sets[artifact.set].total += 1;

    // Count pieces
    counts.sets[artifact.set][artifact.piece] += 1;
  });

  // Sort sets by total count
  counts.sortedSets = Object.keys(counts.sets)
    .sort((a, b) => counts.sets[b].total - counts.sets[a].total);
  return counts;
}

function countArtifactsByGroup(artifactData) {
  const groupCounts = {};
  artifactData.forEach((artifact) => {
    switch (artifact.slotKey) {
      case 'flower':
      case 'plume': {
        const group = `${artifact.set}-${artifact.slotKey}`; // e.g. 'gladiator-flower'
        if (!groupCounts[group]) {
          groupCounts[group] = {
            piece: artifact.slotKey,
            set: artifact.set,
            stat: '',
            count: 1,
          };
        } else {
          groupCounts[group].count += 1;
        }
        break;
      }
      case 'sands': {
        const group = `${artifact.set}-${artifact.slotKey}-${artifact.mainStatKey}`; // e.g. 'gladiator-sands-ATK%'
        if (!groupCounts[group]) {
          groupCounts[group] = {
            piece: artifact.slotKey,
            set: artifact.set,
            stat: artifact.mainStatKey,
            count: 1,
          };
        } else {
          groupCounts[group].count += 1;
        }
        break;
      }
      case 'goblet': {
        const group = `${artifact.slotKey}-${artifact.mainStatKey}`; // e.g. 'goblet-Physical DMG Bonus'
        if (!groupCounts[group]) {
          groupCounts[group] = {
            piece: artifact.slotKey,
            set: 'generic',
            stat: artifact.mainStatKey,
            count: 1,
          };
        } else {
          groupCounts[group].count += 1;
        }
        break;
      }
      case 'circlet': {
        const group = `${artifact.set}-${artifact.slotKey}-${artifact.mainStatKey}`; // e.g. 'gladiator-circlet-CRIT DMG'
        if (!groupCounts[group]) {
          groupCounts[group] = {
            piece: artifact.slotKey,
            set: artifact.set,
            stat: artifact.mainStatKey,
            count: 1,
          };
        } else {
          groupCounts[group].count += 1;
        }
        break;
      }
      default: {
        break;
      }
    }
  });
  return {
    sortedGroups: Object.keys(groupCounts)
      .sort((a, b) => groupCounts[b].count - groupCounts[a].count),
    groups: groupCounts,
  };
}

const artifactReducer = (
  state = {
    asList: [],
    byCharacter: {},
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
      newState.byCharacter = sortDataByCharacter(newState.asList);
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
      newState.byCharacter = sortDataByCharacter(newState.asList);
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
