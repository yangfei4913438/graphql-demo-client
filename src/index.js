import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './index.css';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import { client } from './core/graphql';
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  <ApolloProvider client={client}>
    <SnackbarProvider maxSnack={5}>
      <App />
    </SnackbarProvider>
  </ApolloProvider>,
  document.getElementById('root'),
);
