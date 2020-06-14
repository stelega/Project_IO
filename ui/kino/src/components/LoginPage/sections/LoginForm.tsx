import React, { useState } from 'react';
import {
  MenuItem,
  Button,
  ThemeProvider,
  TextField,
  Dialog,
} from '@material-ui/core';
import {
  Container,
  Input,
  Title,
  Select,
  MarginRight,
  ButtonMargin,
  customTheme,
  ErrorContent,
} from './LoginFormStyles';
import { apiLogin } from '../../../api/login';
import UserContext from '../../../services/Seassion';
import Redirect from '../../Redirect';

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
  const [logged, setLogged] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleLogTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogType(event.target.value);
  };
  const handleDialogClose = () => {
    setError(undefined);
  };

  const submit = async () => {
    try {
      await apiLogin(login, password, logType);
    } catch (error) {
      setError('Nieporawny login i/lub hasło');
    }
    if (UserContext.isLoggedIn()) {
      setLogged(true);
    }
  };

  return (
    <>
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
      {logged && <Redirect to={logType} />}
      {error && (
        <Dialog
          open={error !== undefined}
          keepMounted
          onClose={handleDialogClose}>
          <ErrorContent>{error}</ErrorContent>
        </Dialog>
      )}
    </>
  );
};

export default LoginForm;
