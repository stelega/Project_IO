import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage/LoginPage';
import SecondPage from './components/SecondPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/second'>
          <SecondPage />
        </Route>
        <Route exact path='/'>
          <LoginPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
