import React, { Fragment } from 'react';
import Header from './views/Header/header';
import Menus from './views/Menu/menus';
import './App.css';
import Router from './Router/Router';

const App = () => {
  return (
    <Fragment>
      <Header />
      <article className={'layout'}>
        <Menus />
        <div className={'layout_right'}>
          <Router />
        </div>
      </article>
    </Fragment>
  );
};

export default App;
