import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';
import { UsersProvider } from './hooks/auth/useAuthContext';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './styles/global';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
  <UsersProvider>
  <BrowserRouter>
    <App />
    <GlobalStyle />
  </BrowserRouter>
  </UsersProvider>
  </React.StrictMode>
);
