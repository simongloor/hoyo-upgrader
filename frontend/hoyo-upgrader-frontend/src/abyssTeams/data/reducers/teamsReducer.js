/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable default-param-last */

import { loadStateFromStorage, saveStateToStorage } from '../localStorage';
import paths from '../paths';

const saveState = (state) => {
  saveStateToStorage(
    paths.localStorage.abyssTeams,
    {
      data: JSON.stringify(state, 0, 2),
    },
  );
};

const teamsReducer = (
  state = null,
  action,
) => {
  const newState = { ...state };

  switch (action.type) {
    case 'LOAD_TEAMS': {
      // prepare data to be processed
      let newJsonData = action.payload.exampleJsonData;

      // ensure that there is always data in the local storage
      const localJsonData = loadStateFromStorage(
        paths.localStorage.abyssTeams,
        {},
        '',
      );

      // no local data yet?
      if (!localJsonData.data) {
        saveStateToStorage(
          paths.localStorage.abyssTeams,
          {
            data: JSON.stringify(action.payload.exampleJsonData, 0, 2),
          },
        );
      } else {
        newJsonData = JSON.parse(localJsonData.data);
      }

      return newJsonData;
    }
    case 'RESTORE_TEAMS': {
      const restoredData = action.payload.data;
      saveState(restoredData);
      return restoredData;
    }
    case 'TOGGLE_CHARACTER': {
      const { characterName } = action.payload;
      if (newState.disabledCharacters.includes(characterName)) {
        newState.disabledCharacters.splice(newState.disabledCharacters.indexOf(characterName), 1);
      } else {
        newState.disabledCharacters.push(characterName);
      }
      saveState(newState);
      return newState;
    }
    case 'TOGGLE_HIGHLIGHTED_CHARACTER': {
      const { characterName } = action.payload;
      if (newState.highlightedCharacters.includes(characterName)) {
        newState.highlightedCharacters.splice(newState.highlightedCharacters.indexOf(characterName), 1);
      } else {
        newState.highlightedCharacters.push(characterName);
      }
      saveState(newState);
      return newState;
    }
    case 'ADD_TEAM': {
      newState.teams.push({
        ...action.payload.team,
        id: newState.teams.reduce((max, team) => (team.id > max ? team.id : max), 0) + 1,
      });
      saveState(newState);
      return newState;
    }
    case 'UPDATE_TEAM': {
      const teamIndex = newState.teams.findIndex((team) => team.id === action.payload.team.id);
      newState.teams[teamIndex] = action.payload.team;
      saveState(newState);
      return newState;
    }
    case 'REMOVE_TEAM': {
      newState.teams.splice(newState.teams.indexOf(action.payload.team), 1);
      saveState(newState);
      return newState;
    }
    default: {
      return state;
    }
  }
};
export default teamsReducer;
