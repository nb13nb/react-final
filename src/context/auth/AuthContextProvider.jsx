import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { reducer, initialState } from './reducer';
import { authenticateAction } from './actions';

const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    authIsLoading: true, 
  });

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      dispatch(authenticateAction(token));
    }
    dispatch({ type: 'AUTH_LOADING_DONE' });
  }, [dispatch]);

  return (
    <authContext.Provider value={{ state, dispatch }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(authContext);
  if (!ctx) {
    throw new Error('useAuthContext must be used within AuthContextProvider');
  }
  return ctx;
};
