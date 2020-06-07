import React, { useState } from 'react';
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

const options = ['Tak', 'Nie'];

interface HallFormProps {
  handleClose: (event: React.MouseEvent<HTMLElement>) => void;
  handleAction: (
    name: string,
    rowsCount: number,
    seatsPerRow: number,
    availability: string
  ) => void;
  buttonText: string;
}

const HallForm = (props: HallFormProps) => {
  const [name, setName] = useState<string>();
  const [rowsCount, setRowsCount] = useState<number>();
  const [seatsPerRow, setSeatsPerRow] = useState<number>();
  const [availability, setAvailability] = useState<string>('Tak');

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
    if (name && rowsCount && seatsPerRow) {
      props.handleAction(name, rowsCount, seatsPerRow, availability);
    }
  };

  return (
    <Container>
      <Title>Dodaj salę</Title>
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
