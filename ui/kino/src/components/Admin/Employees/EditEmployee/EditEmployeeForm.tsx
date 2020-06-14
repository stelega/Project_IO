import React, { useState } from 'react';
import styled from 'styled-components';
import {
  TableRow,
  TableCell,
  Table,
  TableBody,
  Checkbox,
  TextField,
  ThemeProvider,
  Switch,
  Button,
} from '@material-ui/core';
import { Employee } from '../../../../models/Employee';
import { customTheme } from '../../../LoginPage/sections/LoginFormStyles';

const TableContainer = styled.div`
  width: 50vw;
  text-align: center;
`;
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

const Red = styled.div`
  color: red;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5%;
  margin-left: 5%;
  margin-right: 5%;
`;

interface EditEmployeeFormProps {
  employee: Employee;
  handleClose: (event: React.MouseEvent<HTMLElement>) => void;
  handleEdit: (
    name: string,
    surname: string,
    login: string,
    isAdmin: boolean
  ) => void;
  handleEditWithPassword: (
    name: string,
    surname: string,
    login: string,
    password: string,
    isAdmin: boolean
  ) => void;
}

const EditEmployeeForm = (props: EditEmployeeFormProps) => {
  const { employee } = props;
  const [name, setName] = useState<string>(employee.name);
  const [surname, setSurname] = useState<string>(employee.surname);
  const [login, setLogin] = useState<string>(employee.login);
  const [isAdmin, setIsAdmin] = useState<boolean>(employee.isAdmin);
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>();
  const [confirm, setConfirm] = useState<string>();
  const [error, setError] = useState<string | undefined>(undefined);

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
  const handlechangePaasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChangePassword(!changePassword);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleConfirmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirm(event.target.value);
  };
  const handleEditClick = () => {
    const checkPassword = validation();
    if (checkPassword === 'Correct') {
      setError(undefined);
      if (changePassword) {
        if (name && surname && login && password) {
          props.handleEditWithPassword(name, surname, login, password, isAdmin);
        }
      } else {
        if (name && surname && login) {
          props.handleEdit(name, surname, login, isAdmin);
        }
      }
    } else {
      setError(checkPassword);
    }
  };
  const validation = (): string => {
    if (!name) {
      return 'Podaj imię';
    } else if (!surname) {
      return 'Podaj nazwisko';
    } else if (!login) {
      return 'Podaj login';
    } else if (changePassword) {
      if (!password) {
        return 'Podaj hasło';
      } else if (!confirm) {
        return 'Potwierdź hasło';
      } else if (password !== confirm) {
        return 'Wprowadzone hasła nie są identyczne';
      }
    }
    return 'Correct';
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Container>
        <Title>Edycja pracownika</Title>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell align='right'>
                  <Text>Imię</Text>
                </TableCell>
                <TableCell align='left'>
                  <TextField
                    id={'name'}
                    onChange={handleNameChange}
                    value={name}
                  />
                </TableCell>
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
                <TableCell align='right'>
                  <Text>Zmiana hasła</Text>
                </TableCell>
                <TableCell align='left'>
                  <Switch
                    checked={changePassword}
                    onChange={handlechangePaasswordChange}
                  />
                </TableCell>
                <TableCell align='right'></TableCell>
                <TableCell align='left'></TableCell>
              </TableRow>
              {changePassword && (
                <TableRow>
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
              )}
              {error && (
                <TableRow>
                  <TableCell colSpan={4} align='center'>
                    {error ? <Red>{error}</Red> : <br />}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
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
            onClick={handleEditClick}>
            Edytuj
          </Button>
        </ButtonContainer>
      </Container>
    </ThemeProvider>
  );
};

export default EditEmployeeForm;
