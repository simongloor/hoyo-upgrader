import { combineReducers } from 'redux';

import filterReducer from './filterReducer';
import artifactReducer from './artifactReducer';

const allReducer = combineReducers({
  filter: filterReducer,
  artifacts: artifactReducer,
});
export default allReducer;
