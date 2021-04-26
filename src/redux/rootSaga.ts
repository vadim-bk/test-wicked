import { fork, all } from 'redux-saga/effects';
import { usersWatcher } from '../components/Users/actions';

const sagas = [usersWatcher];

export default function* rootSaga() {
  yield all(sagas.map(fork));
}
