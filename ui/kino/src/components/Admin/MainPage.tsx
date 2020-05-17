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
        {optionsState === 'Filmy' ? (
          <Films />
        ) : optionsState === 'Pracownicy' ? (
          <Employees />
        ) : (
          <Halls />
        )}
      </Container>
    </>
  );
};

export default AdminMainPage;
