import React from 'react';
import LoginForm from './sections/LoginForm';
import {
  TextContainer,
  LeftContainer,
  Box,
  RightContainer,
  Text,
} from './styles';

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
