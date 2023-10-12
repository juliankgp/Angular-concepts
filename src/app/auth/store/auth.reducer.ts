// import { createReducer, on } from '@ngrx/store';
// import { User } from '../user.model';
// import { login, loginFail, loginStart, logout } from './auth.actions';

// export interface State {
//   user: User;
//   authError: string;
//   loading: boolean;
// }
// const initialState = {
//   user: null,
//   authError: null,
//   loading: false
// };

// export const authReducer = createReducer(
//   initialState,
//   on(login, (state, action) => {
//     debugger
//     const user = new User(
//       action.payload.email,
//       action.payload.userId,
//       action.payload.token,
//       action.payload.expirationDate
//     );
//     return {
//       ...state,
//       authError: null,
//       user,
//       loading: false
//     };
//   }),
//   on(logout, (state, action) => {
//     return {
//       ...state,
//       user: null,
//     };
//   }),
//   on(loginStart, (state) => {
//     return {
//       ...state,
//       authError: null,
//       loading: true,
//     };
//   }),
//   on(loginFail, (state, action) => {
//     return {
//       ...state,
//       user: null,
//       authError: action.error,
//       loading: false
//     };
//   }),
// );


import { createReducer, on } from '@ngrx/store';

import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false
};

export const authReducer = createReducer(
  initialState,
  on(
    AuthActions.authenticateSuccess,
    (state, action) => {
      const user = new User(
        action.email,
        action.userId,
        action.token,
        action.expirationDate
      );
      return {
        ...state,
        authError: null,
        user: user,
        loading: false
      };
    }
  ),
  on(
    AuthActions.logout,
    (state) => {
      return {
        ...state,
        user: null
      };
    }
  ),
  on(
    AuthActions.loginStart,
    AuthActions.signupStart,
    (state) => {
      return {
        ...state,
        authError: null,
        loading: true
      };
    }
  ),
  on(
    AuthActions.authenticateFail,
    (state, action) => {
      return {
        ...state,
        user: null,
        authError: action.error,
        loading: false
      };
    }
  ),
  // on(
  //   AuthActions.signupStart,
  //   (state) => {
  //     return {
  //       ...state,
  //       authError: null,
  //       loading: true
  //     }
  //   }
  // )
);
