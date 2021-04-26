import { ControllerRenderProps } from 'react-hook-form';

export namespace Users {
  export interface User {
    id: number;
    email: string;
    name: string;
    username: string;
    website: string;
    phone: string;
  }

  export interface PostRequest {
    email: string;
    name: string;
    username: string;
    website: string;
    phone: string;
  }

  export interface PutRequest {
    email: string;
    name: string;
    username: string;
    website: string;
    phone: string;
  }

  type Name = 'email' | 'name' | 'username' | 'website' | 'phone';

  export interface IField {
    name: Name;
    component: (field: ControllerRenderProps<Users.PostRequest>) => JSX.Element;
  }

  export interface IFieldRemove {
    name: Name;
    component: JSX.Element;
  }
}
