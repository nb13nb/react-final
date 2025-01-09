import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/auth/AuthContextProvider';
import Navbar from './components/Navbar';
import RoutesFile from './routes';

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Navbar />
        <RoutesFile />
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
