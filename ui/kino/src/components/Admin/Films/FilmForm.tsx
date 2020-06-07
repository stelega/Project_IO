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
import DatePicker from '../../DatePicker';
import moment, { Moment } from 'moment';
import { customTheme } from '../../LoginPage/sections/LoginFormStyles';
import {
  getAgeCategories,
  getMovieCategories,
} from '../../../services/FilmService';
import { Film } from '../../../models/Film';

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

interface FilmFormProps {
  handleClose: (event: React.MouseEvent<HTMLElement>) => void;
  handleAction: (
    title: string,
    director: string,
    ageCategory: string,
    movieCategory: string,
    duration: number,
    dateStart: Moment,
    dateEnd: Moment
  ) => void;
  editModel?: Film;
  buttonText: string;
}

const FilmForm = (props: FilmFormProps) => {
  const [ageCategories, setAgeCategories] = useState<string[]>();
  const [movieCategories, setMovieCategories] = useState<string[]>();
  const [title, setTitle] = useState<string>();
  const [director, setDirector] = useState<string>();
  const [ageCategory, setAgeCategory] = useState<string>('');
  const [movieCategory, setMovieCategory] = useState<string>('');
  const [duration, setDuration] = useState<number>();
  const [dateStart, setDateStart] = useState<Moment>();
  const [dateEnd, setDateEnd] = useState<Moment>();

  useEffect(() => {
    const fetchData = async () => {
      setAgeCategories(await getAgeCategories());
      setMovieCategories(await getMovieCategories());
    };
    const edit = (film: Film) => {
      setTitle(film.title);
      setDirector(film.director);
      setAgeCategory(film.ageCategory);
      setMovieCategory(film.movieCategory);
      setDuration(film.duration);
      setDateStart(moment(film.releaseDate));
      setDateEnd(moment(film.closeDate));
    };
    fetchData();
    if (props.editModel) {
      edit(props.editModel);
    } else {
      setDateStart(moment());
      setDateEnd(moment().add(1, 'week'));
    }
    // eslint-disable-next-line
  }, []);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleDirectorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDirector(event.target.value);
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
  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(Number(event.target.value));
  };
  const handleAddClick = async (event: React.MouseEvent<HTMLElement>) => {
    if (
      title &&
      director &&
      ageCategory &&
      movieCategory &&
      duration &&
      dateStart &&
      dateEnd
    ) {
      props.handleAction(
        title,
        director,
        ageCategory,
        movieCategory,
        duration,
        dateStart,
        dateEnd
      );
    }
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
                <TextField
                  id={'title'}
                  onChange={handleTitleChange}
                  value={title}
                />
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
                  {ageCategories ? (
                    ageCategories.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem></MenuItem>
                  )}
                </TextField>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='right'>
                <Text>Reżyser</Text>
              </TableCell>
              <TableCell align='left'>
                <TextField
                  id={'director'}
                  onChange={handleDirectorChange}
                  value={director}
                />
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
                  {movieCategories ? (
                    movieCategories.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem></MenuItem>
                  )}
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
                  value={dateStart ? dateStart : moment()}
                />
              </TableCell>
              <TableCell align='right'>
                <Text>Czas trwania</Text>
              </TableCell>
              <TableCell align='left'>
                <TextField
                  id='duration'
                  onChange={handleDurationChange}
                  value={duration}
                />
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
                  value={dateEnd ? dateEnd : moment().add(1, 'week')}
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
            <Button
              variant='contained'
              color='secondary'
              onClick={handleAddClick}>
              {props.buttonText}
            </Button>
          </ThemeProvider>
        </ButtonContainer>
      </Container>
    </>
  );
};

export default FilmForm;
