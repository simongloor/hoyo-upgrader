import { combineReducers } from 'redux';

import teamsReducer from './teamsReducer';

const allReducer = combineReducers({
  abyssTeams: teamsReducer,
});
export default allReducer;
