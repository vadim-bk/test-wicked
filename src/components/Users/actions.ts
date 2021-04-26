import { call, put, select, takeEvery } from '@redux-saga/core/effects';

import api from '../../services/api';
import { Users } from '../../models/users';
import { getUsersState } from './selectors';

interface SagaProps {
  type: string;
}

interface ICreateUserSaga {
  values: Users.PostRequest;
  handleClose: () => void;
}

interface IEditUserSaga {
  values: Users.PutRequest;
  handleClose: () => void;
}

export const setLoading = (payload: boolean) => ({ type: 'SET_LOADING', payload });
export const getUsersSaga = () => ({ type: 'GET_USERS_SAGA' });
export const setUsers = (payload: Array<Users.User>) => ({ type: 'SET_USERS', payload });
export const createUserSaga = (payload: ICreateUserSaga) => ({
  type: 'CREATE_USER_SAGA',
  payload,
});
export const editUserSaga = (payload: IEditUserSaga) => ({
  type: 'EDIT_USER_SAGA',
  payload,
});
export const setRemovedUser = (payload: Users.User | null) => ({
  type: 'SET_REMOVER_USER',
  payload,
});
export const removeUserSaga = (payload: number) => ({
  type: 'REMOVE_USER_SAGA',
  payload,
});

function* sagaOnGetUsers() {
  try {
    yield put(setLoading(true));
    const { status, data } = yield call(() => api.users.getUsers());

    if (status >= 200 && status < 300) {
      yield put(setUsers(data));
    }
  } catch (error) {
    console.error(error);
  } finally {
    yield put(setLoading(false));
  }
}

function* sagaOnCreateUser({ payload }: SagaProps & { payload: ICreateUserSaga }) {
  const { values, handleClose } = payload;
  try {
    const { users } = yield select(getUsersState);

    yield put(setLoading(true));
    const { status, data } = yield call(() => api.users.createUser(values));

    if (status >= 200 && status < 300) {
      yield put(setUsers([...users, data]));
      handleClose();
    }
  } catch (error) {
    console.error(error);
  } finally {
    yield put(setLoading(false));
  }
}

function* sagaOnEditUser({ payload }: SagaProps & { payload: IEditUserSaga }) {
  const { values, handleClose } = payload;
  try {
    const { users } = yield select(getUsersState);

    yield put(setLoading(true));
    const { status, data } = yield call(() => api.users.editUser(values));

    if (status >= 200 && status < 300) {
      const updatedUsers = users.map((user: Users.User) => (user.id === data?.id ? data : user));
      yield put(setUsers(updatedUsers));
      handleClose();
    }
  } catch (error) {
    console.error(error);
  } finally {
    yield put(setLoading(false));
  }
}

function* sagaOnRemoveUser({ payload }: SagaProps & { payload: number }) {
  try {
    yield call(() => api.users.removeUser(payload));
  } catch (error) {
    console.error(error);
  }
}

export function* usersWatcher() {
  yield takeEvery('GET_USERS_SAGA', sagaOnGetUsers);
  yield takeEvery('CREATE_USER_SAGA', sagaOnCreateUser);
  yield takeEvery('EDIT_USER_SAGA', sagaOnEditUser);
  yield takeEvery('REMOVE_USER_SAGA', sagaOnRemoveUser);
}
