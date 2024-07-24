import { combineReducers } from 'redux';

import filterReducer from './filterReducer';
import pinboardReducer from './pinboardReducer';
import artifactReducer from './artifactReducer';

const allReducer = combineReducers({
  filter: filterReducer,
  artifacts: artifactReducer,
  pinboard: pinboardReducer,
});
export default allReducer;
