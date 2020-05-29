import React, { useState } from 'react';
import { MenuItem, Button, ThemeProvider, TextField } from '@material-ui/core';
import {
  Container,
  Input,
  Title,
  Select,
  MarginRight,
  ButtonMargin,
  customTheme,
} from './LoginFormStyles';
import { apiLogin } from '../../../api/login';

enum LogType {
  Pracownik,
  Administrator,
}

interface loginType {
  name: string;
}

const getLoginTypes = () => {
  let arr = Object.keys(LogType)
    .filter((o) => isNaN(parseInt(o)))
    .map((x) => ({
      name: x,
    }));
  return arr;
};

const LoginForm = () => {
  const loginTypes: loginType[] = getLoginTypes();
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [logType, setLogType] = useState('Pracownik');
  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleLogTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogType(event.target.value);
  };

  const submit = () => {
    const response = apiLogin(login, password);
    console.log(response);
  };

  return (
    <Container>
      <Title>Zaloguj się</Title>
      <Input>
        Login
        <br />
        <TextField
          id='login'
          onChange={handleLoginChange}
          fullWidth></TextField>
      </Input>
      <Input>
        Hasło
        <br />
        <TextField
          id='password'
          type='password'
          onChange={handlePasswordChange}
          fullWidth></TextField>
      </Input>
      <Select>
        <MarginRight>Zaloguj jako</MarginRight>
        <TextField
          id='log-type'
          select
          value={logType}
          onChange={handleLogTypeChange}>
          {loginTypes.map((option) => (
            <MenuItem key={option.name} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </Select>
      <ButtonMargin>
        <ThemeProvider theme={customTheme}>
          <Button variant='contained' color='primary' onClick={submit}>
            Zaloguj
          </Button>
        </ThemeProvider>
      </ButtonMargin>
    </Container>
  );
};

export default LoginForm;
