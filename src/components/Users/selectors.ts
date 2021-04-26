import { createSelector } from 'reselect';
import { RootState } from '../../redux/store';

export const getUsersState = (state: RootState) => state.users;

export const getLoading = createSelector(getUsersState, (users) => users.loading);
export const getUsers = createSelector(getUsersState, (users) => users.users);
export const getRemovedUser = createSelector(getUsersState, (users) => users.removedUser);

