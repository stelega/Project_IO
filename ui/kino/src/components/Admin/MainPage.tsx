import React, { useState } from 'react';
import TopBar from '../TopBar';
import {
  MenuList,
  MenuItem as mItem,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core';
import styled from 'styled-components';
import Employees from './Employees/Employees';
import Halls from './Halls/Halls';
import Films from './Films/Films';

const Container = styled.div`
  display: flex;
`;
const Menu = styled.div`
  width: 10vw;
  height: 100vh;
  border-right: solid black 1px;
`;
const MenuItem = styled(mItem)`
  font-weight: bold;
`;
const theme = createMuiTheme({
  overrides: {
    MuiMenuItem: {
      root: {
        display: 'block',
        textAlign: 'center',
        '&$selected': {
          backgroundColor: '#E5F9F4',
          color: '#00C896',
        },
      },
    },
  },
});

const options = ['Filmy', 'Sale', 'Pracownicy'];

const AdminMainPage = () => {
  const [optionsState, setOptionsState] = useState('Filmy');
  const handleClick = (value: string) => {
    setOptionsState(value);
  };

  return (
    <>
      <TopBar name={'Jan'} surname={'Kowalski'} />
      <Container>
        <ThemeProvider theme={theme}>
          <Menu>
            <MenuList>
              {options.map((option) => (
                <MenuItem
                  key={option}
                  selected={option === optionsState}
                  onClick={() => handleClick(option)}
                  value={option}>
                  {option}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </ThemeProvider>
        {optionsState === 'Filmy' ? (
          <Films></Films>
        ) : optionsState === 'Pracownicy' ? (
          <Employees></Employees>
        ) : (
          <Halls></Halls>
        )}
      </Container>
    </>
  );
};

export default AdminMainPage;
