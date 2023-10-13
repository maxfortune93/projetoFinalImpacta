import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';
import { UsersProvider } from './hooks/auth/useAuthContext';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './styles/global';
// import { createServer, Model } from 'miragejs';

// createServer({
//   models: {
//     transaction: Model,
//   },

//   seeds(server) {
//     server.db.loadData({
//       transactions: [
//         {
//           id: 1,
//           title: 'Freelance de website',
//           type: 'deposit',
//           category: 'Dev',
//           amount: 6000,
//           createdAt: new Date('2022-02-05 09:00:00'),
//         },
//         {
//           id: 2,
//           title: 'Aluguel',
//           type: 'withdraw',
//           category: 'Casa',
//           amount: 2000,
//           createdAt: new Date('2022-02-14 11:00:00'),
//         }
//       ]
//     })
//   },

//   routes() {
//     this.namespace = 'api';

//     this.get('/transactions', () => {
//       return this.schema.all('transaction');
//     })

//     this.post('/transactions', (schema, request) => {
//       const data = JSON.parse(request.requestBody);
//       return schema.create('transaction', data);
//     })
//   }
// })

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
