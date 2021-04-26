import axios from 'axios';

import { Users } from '../models/users';

const api = 'https://jsonplaceholder.typicode.com';

export default {
  users: {
    getUsers: () => axios.get(`${api}/users`),
    createUser: (data: Users.PostRequest) => axios.post(`${api}/users`, data),
    editUser: (data: Users.PutRequest) => axios.put(`${api}/users`, data),
    removeUser: (id: number) => axios.delete(`${api}/users/${id}`),
  },
};
