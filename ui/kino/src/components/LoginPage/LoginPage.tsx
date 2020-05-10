import React from 'react';
import styled from 'styled-components';
import LoginForm from './LoginForm';

const Box = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftContainer = styled.div`
  background-color: #00c795;
  width: 50vw;
`;

const RightContainer = styled.div`
  background-color: white;
  width: 50vw;
`;

const TextContainer = styled.div`
  margin-top: 15vh;
  margin-left: 10vw;
`;

const Text = styled.div`
  font-size: 500%;
  color: white;
  font-weight: bold;
`;

const LoginPage = () => {
  return (
    <Box>
      <LeftContainer>
        <TextContainer>
          <Text>System</Text>
          <Text>zarządzania</Text>
          <Text>kinem</Text>
        </TextContainer>
      </LeftContainer>
      <RightContainer>
        <LoginForm />
      </RightContainer>
    </Box>
  );
};

export default LoginPage;
