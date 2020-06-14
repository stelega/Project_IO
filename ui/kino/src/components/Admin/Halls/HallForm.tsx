import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  TextField,
  TableRow,
  Table,
  TableCell,
  MenuItem,
  ThemeProvider,
  Button,
} from '@material-ui/core';
import { customTheme } from '../../LoginPage/sections/LoginFormStyles';
import { Hall } from '../../../models/Hall';

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

const TableContainer = styled.div`
  width: 50%;
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

interface HallFormProps {
  handleClose: (event: React.MouseEvent<HTMLElement>) => void;
  handleAction: (
    name: string,
    rowsCount: number,
    seatsPerRow: number,
    availability: string
  ) => void;
  buttonText: string;
  editModel?: Hall;
  formTitle: string;
}

const HallForm = (props: HallFormProps) => {
  const options = ['Tak', 'Nie'];
  const [name, setName] = useState<string>();
  const [rowsCount, setRowsCount] = useState<number>();
  const [seatsPerRow, setSeatsPerRow] = useState<number>();
  const [availability, setAvailability] = useState<string>('');
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const edit = (hall: Hall) => {
      setName(hall.name);
      setRowsCount(hall.rows);
      setSeatsPerRow(hall.seatsPerRow);
      setAvailability('Tak');
    };
    if (props.editModel) {
      edit(props.editModel);
    } else {
      setAvailability('Tak');
    }
    // eslint-disable-next-line
  }, []);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleRowsCountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsCount(Number(event.target.value));
  };
  const handleSeatsPerRowChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSeatsPerRow(Number(event.target.value));
  };
  const handleAvailabilityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAvailability(event.target.value);
  };

  const handleActionClick = () => {
    const checkForm = validation();
    if (checkForm === 'Correct') {
      setError(undefined);
      if (name && rowsCount && seatsPerRow && availability) {
        props.handleAction(name, rowsCount, seatsPerRow, availability);
      }
    } else {
      setError(checkForm)
    }

  };

  const validation = (): string => {
    if (!name) {
      return 'Podaj nazwę sali';
    } else if (!rowsCount || Math.floor(rowsCount) !== rowsCount) {
      return 'Podaj poprawną ilość rzędów';
    } else if (!seatsPerRow || Math.floor(seatsPerRow) !== seatsPerRow) {
      return 'Podaj poprawną ilość miejsc w rzędzie';
    } else {
      return 'Correct';
    }
  };

  return (
    <Container>
      <Title>{props.formTitle}</Title>
      <TableContainer>
        <Table>
          <TableRow>
            <TableCell align='right'>
              <Text>Nazwa</Text>
            </TableCell>
            <TableCell align='left'>
              <TextField id={'name'} onChange={handleNameChange} value={name} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='right'>
              <Text>Ilość rzędów</Text>
            </TableCell>
            <TableCell align='left'>
              <TextField
                id={'rowsCount'}
                onChange={handleRowsCountChange}
                value={rowsCount}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='right'>
              <Text>Ilośc miejsc w rzędzie</Text>
            </TableCell>
            <TableCell align='left'>
              <TextField
                id={'seatsPerRow'}
                onChange={handleSeatsPerRowChange}
                value={seatsPerRow}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='right'>
              <Text>Dostępność</Text>
            </TableCell>
            <TableCell align='left'>
              <TextField
                id={'availability'}
                select
                onChange={handleAvailabilityChange}
                value={availability}>
                {options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4} align='center'>
              {error ? <Red>{error}</Red> : <br />}
            </TableCell>
          </TableRow>
        </Table>
      </TableContainer>
      <ButtonContainer>
        <ThemeProvider theme={customTheme}>
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
        </ThemeProvider>
      </ButtonContainer>
    </Container>
  );
};

export default HallForm;
