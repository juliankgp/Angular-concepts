import { createAction, props } from '@ngrx/store';

export const AUTHENTICATE_SUCCESS = '[Auth] Authenticate success';
export const AUTHENTICATE_FAIL = '[Auth] Authenticate fail';
export const LOGIN_START = '[Auth] Login start';
export const SIGNUP_START = '[Auth] Signup start';
export const LOGOUT = '[Auth] Logout';

export const authenticateSuccess = createAction(
  AUTHENTICATE_SUCCESS,
  props<{
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
  }>()
);
export const authenticateFail = createAction(
  AUTHENTICATE_FAIL,
  props<{ error: string }>()
);
export const loginStart = createAction(
  LOGIN_START,
  props<{
    email: string;
    password: string
  }>()
);
export const signupStart = createAction(
  SIGNUP_START,
  props<{
    email: string;
    password: string
  }>()
);

export const logout = createAction(LOGOUT);

