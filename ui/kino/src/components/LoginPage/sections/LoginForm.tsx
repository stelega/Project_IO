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

interface loginType {
  name: string;
}
const loginTypes: loginType[] = [
  { name: 'Administrator' },
  { name: 'Pracownik' },
];

const LoginForm = () => {
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
    console.log(login, password, logType);
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
