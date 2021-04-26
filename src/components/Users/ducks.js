// import { call, put, takeEvery } from '@redux-saga/core/effects';
// import axios from 'axios';
// import Duck from 'extensible-duck';
// import api from '../../services/api';

// export default new Duck({
//   namespace: 'users',
//   store: 'users',
//   types: ['GET_USERS'],
//   initialState: {},
//   sagas: (duck) => ({
//     getUsers: function* () {
//       try {
//         const { data } = yield call(api.users.getUsers);
//         yield put({ type: duck.types.GET_USERS, data });
//       } catch (err) {
//         console.error(err);
//       }
//     },
//   }),
//   takes: (duck) => [takeEvery(duck.types.GET_USERS, duck.sagas.getUsers)],
// });
