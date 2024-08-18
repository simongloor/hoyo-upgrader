/* eslint-disable no-unused-vars */
/* eslint-disable default-param-last */

import { loadStateFromStorage, saveStateToStorage } from '../localStorage';
import paths from '../paths';

const emptySettings = {
  showTutorialOnStart: true,
};

const settingsReducer = (
  state = {
    isLoaded: false,
    data: { ...emptySettings },
  },
  action,
) => {
  let newState = { ...state };

  switch (action.type) {
    case 'LOAD_SETTINGS': {
      // ensure that there is always data in the local storage
      const localJsonData = loadStateFromStorage(
        paths.localStorage.settings,
        {},
        '',
      );

      // no local data yet?
      if (!localJsonData.data) {
        console.log('No local settings found, creating new ones');
        saveStateToStorage(
          paths.localStorage.settings,
          {
            data: JSON.stringify(emptySettings),
          },
        );
        newState.isLoaded = true;
      } else {
        // console.log('loaded settings from local storage', localJsonData.data);
        newState = {
          isLoaded: true,
          data: {
            ...emptySettings,
            ...JSON.parse(localJsonData.data),
          },
        };
      }

      return newState;
    }
    case 'DISABLE_START_TUTORIAL': {
      newState.data.showTutorialOnStart = false;

      // save data to local storage
      saveStateToStorage(
        paths.localStorage.settings,
        {
          data: JSON.stringify(newState.data),
        },
      );

      return newState;
    }
    default: {
      return state;
    }
  }
};
export default settingsReducer;
