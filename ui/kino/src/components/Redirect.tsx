import React from 'react';
import UserContext from '../services/Seassion';
import { Redirect as ReactRedirect } from 'react-router-dom';

interface RedirectProps {
  to: string | 'Login';
}

const Redirect = (props: RedirectProps) => {
  const { to } = props;
  if (to === 'Login') {
    return <ReactRedirect to='/' />;
  }
  const isAdmin = to === 'Administrator' && UserContext.isAdmin();
  const isEmployee = to === 'Pracownik';
  return UserContext.isLoggedIn() ? (
    isAdmin ? (
      <ReactRedirect to='/admin' />
    ) : isEmployee ? (
      <ReactRedirect to='/employee' />
    ) : null
  ) : null;
};

export default Redirect;
