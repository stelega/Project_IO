import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-left: 10vw;
  margin-top: 20vh;
`;
const Title = styled.div`
  color: black;
  font-size: 300%;
  font-weight: bold;
`;

const LoginForm = () => {
  return (
    <Container>
      <Title>Zaloguj się</Title>
    </Container>
  );
};

export default LoginForm;
