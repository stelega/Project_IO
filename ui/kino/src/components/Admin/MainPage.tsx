import React, { useState } from 'react';
import TopBar from '../TopBar';
import styled from 'styled-components';
import Employees from './Employees/Employees';
import Halls from './Halls/Halls';
import Films from './Films/Films';
import LeftMenu from '../LeftMenu';

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

  return (
    <>
      <TopBar name={'Jan'} surname={'Kowalski'} />
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
  );
};

export default AdminMainPage;
