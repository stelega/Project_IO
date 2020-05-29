import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage/LoginPage';
import AdminMainPage from './components/Admin/MainPage';
import EmployeeMainPage from './components/employee/MainPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/admin' component={AdminMainPage} />
        <Route path='/employee' component={EmployeeMainPage} />
        <Route path='/'>
          <LoginPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
