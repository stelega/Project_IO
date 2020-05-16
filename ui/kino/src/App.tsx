import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage/LoginPage';
import AdminMainPage from './components/Admin/MainPage';
import StaffMainPage from './components/Staff/MainPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/admin' component={AdminMainPage} />
        <Route path='/staff' component={StaffMainPage} />
        <Route exact path='/'>
          <LoginPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
