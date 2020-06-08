import React, { useState } from 'react';
import styled from 'styled-components';
import { Employee } from '../../../models/Employee';
import {
  Table,
  TableRow,
  TableCell,
  ThemeProvider,
  Button,
  TextField,
  Checkbox,
} from '@material-ui/core';
import { customTheme } from '../../LoginPage/sections/LoginFormStyles';

const Container = styled.div`
  margin: 5%;
`;

const Title = styled.div`
  margin: 2%;
  color: black;
  font-size: 150%;
  font-weight: bold;
`;

const Text = styled.div`
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5%;
  margin-left: 5%;
  margin-right: 5%;
`;

const Red = styled.div`
  color: red;
`;

interface EmployeeFormProps {
  handleClose: (event: React.MouseEvent<HTMLElement>) => void;
  handleAction: (
    name: string,
    surname: string,
    login: string,
    password: string,
    isAdmin: boolean
  ) => void;
  buttonText: string;
  editModel?: Employee;
  formTitle: string;
}

const EmployeeForm = (props: EmployeeFormProps) => {
  const [name, setName] = useState<string>();
  const [surname, setSurname] = useState<string>();
  const [login, setLogin] = useState<string>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [password, setPassword] = useState<string>();
  const [confirm, setConfirm] = useState<string>();
  const [error, setError] = useState<string | undefined>(undefined);

  const handleActionClick = () => {
    const checkPassword = validation();
    if (checkPassword === 'Correct') {
      setError(undefined);
      if (name && surname && login && password) {
        props.handleAction(name, surname, login, password, isAdmin);
      }
    } else {
      setError(checkPassword);
    }
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(event.target.value);
  };
  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };
  const handleIsAdminChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setIsAdmin(!isAdmin);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleConfirmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirm(event.target.value);
  };
  const validation = (): string => {
    if (!name) {
      return 'Podaj imię';
    } else if (!surname) {
      return 'Podaj nazwisko';
    } else if (!login) {
      return 'Podaj login';
    } else if (!password) {
      return 'Podaj hasło';
    } else if (!confirm) {
      return 'Potwierdź hasło';
    } else if (password === confirm) {
      return 'Correct';
    }
    return 'Wprowadzone hasła nie są identyczne';
  };

  return (
    <Container>
      <ThemeProvider theme={customTheme}>
        <Title>{props.formTitle}</Title>
        <Table>
          <TableRow>
            <TableCell align='right'>
              <Text>Imię</Text>
            </TableCell>
            <TableCell align='left'>
              <TextField id={'name'} onChange={handleNameChange} value={name} />
            </TableCell>
            <TableCell align='right'>
              <Text>Hasło</Text>
            </TableCell>
            <TableCell align='left'>
              <TextField
                id={'password'}
                onChange={handlePasswordChange}
                value={password}
                type='password'
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='right'>
              <Text>Nazwisko</Text>
            </TableCell>
            <TableCell align='left'>
              <TextField
                id={'surname'}
                onChange={handleSurnameChange}
                value={surname}
              />
            </TableCell>
            <TableCell align='right'>
              <Text>Potwierdź hasło</Text>
            </TableCell>
            <TableCell align='left'>
              <TextField
                id={'confirm'}
                onChange={handleConfirmChange}
                value={confirm}
                type='password'
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='right'>
              <Text>Login</Text>
            </TableCell>
            <TableCell align='left'>
              <TextField
                id={'login'}
                onChange={handleLoginChange}
                value={login}
              />
            </TableCell>
            <TableCell align='right'>
              <Text>Admin</Text>
            </TableCell>
            <TableCell align='left'>
              <Checkbox
                checked={isAdmin}
                onClick={handleIsAdminChange}
                color='secondary'
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4} align='center'>
              {error ? <Red>{error}</Red> : <br />}
            </TableCell>
          </TableRow>
        </Table>
        <ButtonContainer>
          <Button
            variant='contained'
            color='default'
            onClick={props.handleClose}>
            Wróć
          </Button>
          <Button
            variant='contained'
            color='secondary'
            onClick={handleActionClick}>
            {props.buttonText}
          </Button>
        </ButtonContainer>
      </ThemeProvider>
    </Container>
  );
};

export default EmployeeForm;
