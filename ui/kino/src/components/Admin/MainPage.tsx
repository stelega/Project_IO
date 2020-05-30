import React, { useState } from 'react';
import TopBar from '../TopBar';
import styled from 'styled-components';
import Employees from './Employees/Employees';
import Halls from './Halls/Halls';
import Films from './Films/Films';
import LeftMenu from '../LeftMenu';
import UserContext from '../../services/Seassion';
import Redirect from '../Redirect';

const Container = styled.div`
  display: flex;
`;
const Box = styled.div`
  width: 90vw;
`;

const options: string[] = ['Filmy', 'Sale', 'Pracownicy'];

const AdminMainPage = () => {
  const [optionsState, setOptionsState] = useState(options[0]);
  const handleChange = (value: string) => {
    setOptionsState(value);
  };

  return UserContext.isLoggedIn() && UserContext.isAdmin() ? (
    <>
      <TopBar />
      <Container>
        <LeftMenu
          options={options}
          state={optionsState}
          handleChange={handleChange}
        />
        <Box>
          {optionsState === 'Filmy' ? (
            <Films />
          ) : optionsState === 'Pracownicy' ? (
            <Employees />
          ) : (
            <Halls />
          )}
        </Box>
      </Container>
    </>
  ) : (
    <Redirect to='Login' />
  );
};

export default AdminMainPage;
