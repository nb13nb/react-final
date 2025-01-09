import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cocktails from './pages/Cocktails';
import CocktailDetail from './pages/CocktailDetail';
import NotFound from './pages/NotFound';
import SignInForm from './components/Auth/SignInForm';
import SignUpForm from './components/Auth/SignUpForm';
import Favorites from './pages/Favorites';
import ProtectedRoute from './components/Auth/ProtectedRoute';

function RoutesFile() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignInForm />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/cocktails" element={<Cocktails />} /> 
      
      <Route 
        path="/cocktail/:cocktailId"
        element={
          <ProtectedRoute>
            <CocktailDetail />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RoutesFile;
