import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { createHistory } from 'history';

var createBrowserHistory = require('history/lib/createBrowserHistory');

/*
 Import components
*/

/* 
 Import components
*/

import Vault from './components/Vault';
import Selection from './components/Selection';
import Selections from './components/Selections';
import App from './components/App';

/*
  Routes
*/
 
var routes = (
  <Router history={createHistory()}>
    <Route path="/" component={App} />
    <Route path="/vault" component={Vault} />
    <Route path="/selections/" component={Selections} />
    <Route path="/selection/:selection/:structure/" component={Selection} />
  </Router>
) 

ReactDOM.render(routes, document.querySelector('#main'));
