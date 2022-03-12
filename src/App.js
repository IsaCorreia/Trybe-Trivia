import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Config from './pages/Config';
import Feedback from './pages/Feedback';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Play from './pages/Play';
import Rank from './pages/Rank';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/play" component={ Play } />
      <Route path="/rank" component={ Rank } />
      <Route path="/config" component={ Config } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="*" component={ NotFound } />
    </Switch>
  );
}
