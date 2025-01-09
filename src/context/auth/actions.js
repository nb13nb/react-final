import { LOG_IN, LOG_OUT, AUTHENTICATE } from './constants';

export const logInAction = (data) => ({
  type: LOG_IN,
  payload: data,
});

export const logOutAction = () => ({
  type: LOG_OUT,
});

export const authenticateAction = (token) => ({
  type: AUTHENTICATE,
  payload: token,
});
