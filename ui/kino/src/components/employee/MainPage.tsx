import React, { useState } from 'react';
import TopBar from '../TopBar';
import styled from 'styled-components';
import LeftMenu from '../LeftMenu';
import Screenings from './Screenings/Screenings';
import Tickets from './Tickets/Tickets';

const Container = styled.div`
  display: flex;
`;

const options: string[] = ['Seanse', 'Bilety'];

const EmployeeMainPage = () => {
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
        {optionsState === 'Seanse' ? <Screenings /> : <Tickets />}
      </Container>
    </>
  );
};

export default EmployeeMainPage;
