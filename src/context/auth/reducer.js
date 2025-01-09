import { LOG_IN, LOG_OUT, AUTHENTICATE } from './constants';
import { isTokenValid } from '../../utils/jwt';

export const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
  authIsLoading: true,
};

export function reducer(state, action) {
  switch (action.type) {
    case AUTHENTICATE: {
      if (!isTokenValid(action.payload)) {
        return { ...state, authIsLoading: false, isAuthenticated: false, token: null };
      }
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
      };
    }
    case LOG_IN:
      localStorage.setItem('accessToken', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user || null,
      };
    case LOG_OUT:
      localStorage.removeItem('accessToken');
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
      };
    case 'AUTH_LOADING_DONE':
      return {
        ...state,
        authIsLoading: false,
      };
    default:
      return state;
  }
}
