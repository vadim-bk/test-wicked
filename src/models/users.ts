export namespace Users {
  // export class User {
  //   constructor(
  //     public id: number,
  //     public name: string,
  //     public username: string,
  //     public email: string,
  //     public phone: string,
  //     public website: string,
  //   ) {}
  // }

  export interface User {
    id: number;
    email: string;
    name: string;
    username: string;
    website: string;
    phone: string;
  }

  // export interface ResponsePayload {
  //   items: Array<Participant>;
  //   totalCount: number;
  // }

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
    component: (field: any) => JSX.Element;
  }

  export interface IFieldRemove {
    name: Name;
    component: JSX.Element;
  }

  // export interface PromiseError {
  // 	brand: Array<never>;
  // 	model: Array<never>;
  // 	number: Array<never>;
  // 	vehicleType: Array<never>;
  // }
}
