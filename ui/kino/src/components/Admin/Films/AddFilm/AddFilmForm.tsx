import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  MenuItem,
  Button,
  ThemeProvider,
} from '@material-ui/core';
import DatePicker from './DatePicker';
import moment, { Moment } from 'moment';
import { customTheme } from '../../../LoginPage/sections/LoginFormStyles';
import {
  getAgeCategories,
  getMovieCategories,
} from '../../../../services/FilmService';

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

interface AddFilmForm {
  handleClose: (event: React.MouseEvent<HTMLElement>) => void;
}

const availableOptions = ['Tak', 'Nie'];

const AddForm = (props: AddFilmForm) => {
  const [ageCategories, setAgeCategories] = useState<string[]>();
  const [movieCategories, setMovieCategories] = useState<string[]>();
  const [ageCategory, setAgeCategory] = useState<string>();
  const [movieCategory, setMovieCategory] = useState<string>();
  const [available, setAvailable] = useState('Tak');
  const [dateStart, setDateStart] = useState(moment());
  const [dateEnd, setDateEnd] = useState(moment().add('week', 1));

  useEffect(() => {
    const fetchData = async () => {
      setAgeCategories(await getAgeCategories());
      setMovieCategories(await getMovieCategories());
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };
  const handleDirectorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };
  const handleDateStartChange = (date: Moment) => {
    setDateStart(date);
  };
  const handleDateEndChange = (date: Moment) => {
    setDateEnd(date);
  };
  const handleAgeCategoryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAgeCategory(event.target.value);
  };
  const handleMovieCategoryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMovieCategory(event.target.value);
  };
  const handleAvailableChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAvailable(event.target.value);
  };
  return (
    <>
      <Container>
        <Title>Dodaj film</Title>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align='right'>
                <Text>Tytuł</Text>
              </TableCell>
              <TableCell align='left'>
                <TextField id={'title'} onChange={handleTitleChange} />
              </TableCell>
              <TableCell align='right'>
                <Text>Kategoria wiekowa</Text>
              </TableCell>
              <TableCell align='left'>
                <TextField
                  id='age-category'
                  select
                  value={ageCategory}
                  onChange={handleAgeCategoryChange}>
                  {ageCategories &&
                    ageCategories.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                </TextField>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='right'>
                <Text>Reżyser</Text>
              </TableCell>
              <TableCell align='left'>
                <TextField id={'director'} onChange={handleDirectorChange} />
              </TableCell>
              <TableCell align='right'>
                <Text>Kategoria filmu</Text>
              </TableCell>
              <TableCell align='left'>
                <TextField
                  id='movie-category'
                  select
                  value={movieCategory}
                  onChange={handleMovieCategoryChange}>
                  {movieCategories &&
                    movieCategories.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                </TextField>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='right'>
                <Text>Przedział emisji od</Text>
              </TableCell>
              <TableCell align='left'>
                <DatePicker
                  id='start-time'
                  onChange={handleDateStartChange}
                  value={dateStart}
                />
              </TableCell>
              <TableCell align='right'>
                <Text>Dostępny</Text>
              </TableCell>
              <TableCell align='left'>
                <TextField
                  id='available'
                  select
                  value={available}
                  onChange={handleAvailableChange}>
                  {availableOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='right'>
                <Text>Przedział emisji do</Text>
              </TableCell>
              <TableCell align='left'>
                <DatePicker
                  id='end-time'
                  onChange={handleDateEndChange}
                  value={dateEnd}
                />
              </TableCell>
              <TableCell align='right'></TableCell>
              <TableCell align='left'></TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <ButtonContainer>
          <ThemeProvider theme={customTheme}>
            <Button
              variant='contained'
              color='default'
              onClick={props.handleClose}>
              Wróć
            </Button>
            <Button variant='contained' color='secondary'>
              Dodaj
            </Button>
          </ThemeProvider>
        </ButtonContainer>
      </Container>
    </>
  );
};

export default AddForm;
