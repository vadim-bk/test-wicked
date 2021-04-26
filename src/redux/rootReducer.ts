import { combineReducers } from 'redux';

import { usersReducer } from '../components/Users/reducer';

export const rootReducer = combineReducers({
  users: usersReducer,
});
