import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getFutereFilmsTitles } from '../../../services/FilmService';
import { FilmsTitles } from '../../../models/Film';
import {
  Table,
  TableRow,
  TableCell,
  MenuItem,
  TextField,
  ThemeProvider,
  TableBody,
} from '@material-ui/core';
import DatePicker from '../../DatePicker';
import { Moment } from 'moment';
import moment from 'moment';
import { hours, minutes } from './constVariables';
import { Hall } from '../../../models/Hall';
import { getAllHalls } from '../../../services/HallService';
import { customTheme } from '../../LoginPage/sections/LoginFormStyles';
import TicketTable from './TicketTable';

const Container = styled.div`
  margin-top: 4vh;
  margin-left: 5vw;
  margin-right: 5vw;
`;
const TableContainer = styled.div`
  margin-top: 1vh;
  width: 70vw;
`;
const Title = styled.div`
  color: black;
  font-size: 150%;
  font-weight: bold;
`;
const ListContainer = styled.div`
  margin-top: 1vh;
`;

const Tickets = () => {
  const [titlies, setTitlies] = useState<FilmsTitles>({ data: [] });
  const [halls, setHalls] = useState<Hall[]>([]);
  const [hall, setHall] = useState<string>('');
  const [film, setFilm] = useState<string>('');
  const [date, setDate] = useState<Moment>(moment());
  const [hour, setHour] = useState<string>('10');
  const [minute, setMinute] = useState<string>('00');

  useEffect(() => {
    const fetchData = async () => {
      const titles = await getFutereFilmsTitles();
      setTitlies(titles);
      const halls = await getAllHalls();
      setHalls(halls);
    };

    fetchData();
  }, []);

  const handleFilmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilm(event.target.value);
  };
  const handleDateChange = (date: Moment) => {
    setDate(date);
  };
  const handleHourChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHour(event.target.value);
  };
  const handleMinuteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinute(event.target.value);
  };
  const handleHallChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHall(event.target.value);
  };

  return (
    <Container>
      <Title>Bilety</Title>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align='right'>Film</TableCell>
              <TableCell align='left'>
                <TextField
                  id='film'
                  select
                  value={film}
                  onChange={handleFilmChange}>
                  {titlies.data && titlies.data.length > 0 ? (
                    titlies.data.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem></MenuItem>
                  )}
                </TextField>
              </TableCell>
              <TableCell align='right'>Sala</TableCell>
              <TableCell align='left'>
                <TextField
                  id='hall'
                  select
                  value={hall}
                  onChange={handleHallChange}>
                  {halls && halls.length > 0 ? (
                    halls.map((option) => (
                      <MenuItem key={option.name} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem></MenuItem>
                  )}
                </TextField>
              </TableCell>
              <TableCell align='right'>Dzień</TableCell>
              <TableCell align='left'>
                <ThemeProvider theme={customTheme}>
                  <DatePicker
                    id='date'
                    onChange={handleDateChange}
                    min={moment()}
                    value={date}></DatePicker>
                </ThemeProvider>
              </TableCell>
              <TableCell align='right'>Godzina</TableCell>
              <TableCell align='left'>
                <TextField
                  id='hour'
                  select
                  value={hour}
                  onChange={handleHourChange}>
                  {hours.map((option: string) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id='minute'
                  select
                  value={minute}
                  onChange={handleMinuteChange}>
                  {minutes.map((option: string) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {film && hall && (
        <ListContainer>
          <TicketTable
            film={film}
            hall={hall}
            date={date}
            hour={hour}
            minute={minute}
          />
        </ListContainer>
      )}
    </Container>
  );
};

export default Tickets;
