import { combineReducers } from 'redux';

import filterReducer from './filterReducer';
import pinboardReducer from './pinboardReducer';
import artifactReducer from './artifactReducer';
import characterReducer from './characterReducer';

const allReducer = combineReducers({
  filter: filterReducer,
  artifacts: artifactReducer,
  characters: characterReducer,
  pinboard: pinboardReducer,
});
export default allReducer;
