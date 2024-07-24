/* eslint-disable no-unused-vars */
/* eslint-disable default-param-last */

import { loadStateFromStorage, saveStateToStorage } from '../localStorage';
import paths from '../paths';

const characterReducer = (
  state = {},
  action,
) => {
  const newState = { ...state };

  switch (action.type) {
    case 'LOAD_CHARACTERS': {
      // prepare data to be processed
      let newJsonData = action.payload.exampleJsonData;

      // ensure that there is always data in the local storage
      const localJsonData = loadStateFromStorage(
        paths.localStorage.charactersJson,
        {},
        '',
      );

      // no local data yet?
      if (!localJsonData.data) {
        saveStateToStorage(
          paths.localStorage.charactersJson,
          {
            data: JSON.stringify(action.payload.exampleJsonData, 0, 2),
          },
        );
      } else {
        newJsonData = JSON.parse(localJsonData.data);
      }

      return newJsonData;
    }
    default: {
      return state;
    }
  }
};
export default characterReducer;
