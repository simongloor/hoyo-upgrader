/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable default-param-last */

import { loadStateFromStorage, saveStateToStorage } from '../localStorage';
import paths from '../paths';

const teamsReducer = (
  state = [],
  action,
) => {
  const newState = { ...state };

  switch (action.type) {
    case 'LOAD_TEAMS': {
      // prepare data to be processed
      let newJsonData = action.payload.exampleJsonData;
      console.log('newJsonData', newJsonData);

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
    case 'TOGGLE_CHARACTER': {
      const { characterName } = action.payload;
      if (newState.disabledCharacters.includes(characterName)) {
        newState.disabledCharacters.splice(newState.disabledCharacters.indexOf(characterName), 1);
      } else {
        newState.disabledCharacters.push(characterName);
      }
      saveStateToStorage(
        paths.localStorage.abyssTeams,
        {
          data: JSON.stringify(newState, 0, 2),
        },
      );
      return newState;
    }
    // case 'DISABLE_CHARACTER': {
    //   const { characterName } = action.payload;
    //   if (!newState.disabledCharacters.includes(characterName)) {
    //     newState.disabledCharacters.push(characterName);
    //   }
    //   return newState;
    // }
    // case 'ENABLE_CHARACTER': {
    //   const { characterName } = action.payload;
    //   if (newState.disabledCharacters.includes(characterName)) {
    //     newState.disabledCharacters.splice(newState.disabledCharacters.indexOf(characterName), 1);
    //   }
    //   return newState;
    // }
    case 'ADD_TEAM': {
      newState.push(action.payload.team);
      return newState;
    }
    case 'REMOVE_TEAM': {
      newState.splice(newState.indexOf(action.payload.team), 1);
      return newState;
    }
    case 'UPDATE_TEAM': {
      const teamIndex = newState.findIndex((team) => team.id === action.payload.team.id);
      newState[teamIndex] = action.payload.team;
      return newState;
    }
    default: {
      return state;
    }
  }
};
export default teamsReducer;
