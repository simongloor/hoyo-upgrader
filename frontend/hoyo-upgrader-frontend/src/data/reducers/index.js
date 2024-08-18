import { combineReducers } from 'redux';

import filterReducer from './filterReducer';
import pinboardReducer from './pinboardReducer';
import artifactReducer from './artifactReducer';
import characterReducer from './characterReducer';
import settingsReducer from './settingsReducer';

const allReducer = combineReducers({
  filter: filterReducer,
  artifacts: artifactReducer,
  characters: characterReducer,
  pinboard: pinboardReducer,
  settings: settingsReducer,
});
export default allReducer;
