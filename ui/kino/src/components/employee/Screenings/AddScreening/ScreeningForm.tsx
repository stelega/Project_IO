import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  TableRow,
  TableCell,
  Table,
  TextField,
  MenuItem,
  ThemeProvider,
  Button,
} from '@material-ui/core';
import { Film } from '../../../../models/Film';
import { getFutureFilms } from '../../../../services/FilmService';
import DatePicker from '../../../DatePicker';
import moment, { Moment } from 'moment';
import { HallWithHours } from '../../../../models/Hall';
import { getHallsWithHours } from '../../../../services/HallService';
import { customTheme } from '../../../LoginPage/sections/LoginFormStyles';

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

interface ScreeningFormProps {
  handleClose: (event: React.MouseEvent<HTMLElement>) => void;
  handleAction: (
    filmId: string,
    date: Moment,
    hallId: string,
    hour: string
  ) => void;
}

const ScreeningForm = (props: ScreeningFormProps) => {
  const [filmId, setFilmId] = useState<string>();
  const [date, setDate] = useState<Moment>(moment());
  const [filmsData, setFilms] = useState<Film[]>();
  const [hallsData, setHallsData] = useState<HallWithHours[]>();
  const [hallId, setHallId] = useState<string>();
  const [hour, setHour] = useState<string>();

  useEffect(() => {
    const getFilms = async () => {
      const films: Film[] = await getFutureFilms();
      setFilms(films);
    };
    if (!filmsData) {
      getFilms();
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    const fetchHalls = async () => {
      if (filmId && date) {
        const hallsData = await getHallsWithHours(filmId, date);
        setHallsData(hallsData);
      }
    };
    fetchHalls();
    // eslint-disable-next-line
  }, [filmId, date]);

  const handleFilmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilmId(event.target.value);
  };
  const handleDateChange = (date: Moment) => {
    setDate(date);
  };
  const handleHallChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHallId(event.target.value);
  };
  const handleHourChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHour(event.target.value);
  };

  const handleActionClick = () => {
    if (filmId && date && hallId && hour) {
      props.handleAction(filmId, date, hallId, hour);
    }
  };
  return (
    <ThemeProvider theme={customTheme}>
      <Container>
        <Title>Dodaj seans</Title>
        <TableContainer>
          <Table>
            <TableRow>
              <TableCell align='right'>
                <Text>Film</Text>
              </TableCell>
              <TableCell align='left'>
                <TextField
                  id='film'
                  select
                  value={filmId}
                  onChange={handleFilmChange}>
                  {filmsData && filmsData.length > 0 ? (
                    filmsData.map((option) => (
                      <MenuItem key={option.movieId} value={option.movieId}>
                        {option.title}
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
                <Text>Dzień</Text>
              </TableCell>
              <TableCell align='left'>
                <DatePicker
                  id='date'
                  onChange={handleDateChange}
                  disable={filmId ? false : true}
                  value={
                    filmId
                      ? moment.max(
                          moment(
                            filmsData?.filter(
                              (ele) => ele.movieId === filmId
                            )[0].releaseDate
                          ),
                          moment()
                        )
                      : moment()
                  }
                  min={
                    filmId
                      ? moment.max(
                          moment(
                            filmsData?.filter(
                              (ele) => ele.movieId === filmId
                            )[0].releaseDate
                          ),
                          moment()
                        )
                      : moment()
                  }
                  max={
                    filmId
                      ? moment(
                          filmsData?.filter((ele) => ele.movieId === filmId)[0]
                            .closeDate
                        )
                      : moment()
                  }
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='right'>
                <Text>Sala</Text>
              </TableCell>
              <TableCell align='left'>
                <TextField
                  id='hall'
                  select
                  value={hallId}
                  disabled={hallsData ? false : true}
                  onChange={handleHallChange}>
                  {hallsData && hallsData.length > 0 ? (
                    hallsData.map((option) => (
                      <MenuItem key={option.hallId} value={option.hallId}>
                        {option.name}
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
                <Text>Godzina</Text>
              </TableCell>
              <TableCell align='left'>
                <TextField
                  id='hour'
                  select
                  value={hour}
                  disabled={hallId ? false : true}
                  onChange={handleHourChange}>
                  {hallsData && hallId && hallsData.length > 0 ? (
                    hallsData
                      .filter((ele) => ele.hallId === hallId)[0]
                      .hours.map((option) => (
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
            onClick={handleActionClick}>
            Dodaj
          </Button>
        </ButtonContainer>
      </Container>
    </ThemeProvider>
  );
};

export default ScreeningForm;
