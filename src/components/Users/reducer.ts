import { Users } from '../../models/users';

interface IAction {
  type: string;
  payload: any;
}

// export interface IUser {
//   id: number;
//   name: string;
//   username: string;
//   email: string;
//   address: {
//     street: string;
//     suite: string;
//     city: string;
//     zipcode: string;
//     geo: {
//       lat: string;
//       lng: string;
//     };
//   };
//   phone: string;
//   website: string;
//   company: {
//     name: string;
//     catchPhrase: string;
//     bs: string;
//   };
// }

interface IInitialState {
  loading: boolean;
  users: null | Array<Users.User>;
  removedUser: null | Array<Users.User>;
}

export const initialState: IInitialState = {
  loading: false,
  users: null,
  removedUser: null,
};

export const usersReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_USERS':
      return { ...state, users: action.payload };

    case 'SET_REMOVER_USER':
      return { ...state, removedUser: action.payload };

    default:
      return state;
  }
};
