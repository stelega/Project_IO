import React, {useState} from 'react';
import TopBar from '../TopBar';
import styled from 'styled-components';
import LeftMenu from '../LeftMenu';
import Screenings from './Screenings/Screenings';
import Tickets from './Tickets/Tickets';
import UserContext from '../../services/Seassion';
import Redirect from '../Redirect';

const Container = styled.div`
  display: flex;
`;

const Box = styled.div`
  width: 90vw;
`;

const options: string[] = ['Seanse', 'Bilety'];

const EmployeeMainPage = () => {
  const [optionsState, setOptionsState] = useState(options[0]);
  const handleChange = (value: string) => {
    setOptionsState(value);
  };
  return UserContext.isLoggedIn() ? (
    <>
      <TopBar/>
      <Container>
        <LeftMenu
          options={options}
          state={optionsState}
          handleChange={handleChange}
        />
        <Box>
          {optionsState === 'Seanse' ? <Screenings/> : <Tickets/>}
        </Box>
      </Container>
    </>
  ) : (
    <Redirect to='Login'/>
  );
};

export default EmployeeMainPage;
