import { Moment } from 'moment';
import { Hall, NewHall, HallWithHours, HallWithSeats } from '../models/Hall';
import {
  apiAddHall,
  apiDeleteHall,
  apiEditHall,
  apiGetHall,
  apiGetHalls,
  apiGetHallsWithHours,
  apiGetAllHalls,
} from '../api/hallsApi';
import { PagedList } from '../models/PagedList';
import { apiGetHallSeats } from '../api/screeningsApi';

export const getHalls = async (
  rowsPerPage?: number,
  page?: number,
  orderBy?: string,
  order?: 'asc' | 'desc',
  search?: string
): Promise<PagedList<Hall>> => {
  return await apiGetHalls(rowsPerPage, page, orderBy, order, search);
};

export const getAllHalls = async (): Promise<Hall[]> => {
  return await apiGetAllHalls();
};

export const addHall = async (
  name: string,
  rowsCount: number,
  seatsPerRow: number,
  availability: string
) => {
  const body: NewHall = {
    name: name,
    rows: rowsCount,
    seatsPerRow: seatsPerRow,
    availability: availability === 'Tak',
    numOfSeats: seatsPerRow * rowsCount,
  };
  await apiAddHall(body);
};

export const deleteHall = async (hallId: string) => {
  await apiDeleteHall(hallId);
};

export const getHall = async (hallId: string): Promise<Hall> => {
  return await apiGetHall(hallId);
};

export const editHall = async (
  hallId: string,
  name: string,
  rowsCount: number,
  seatsPerRow: number,
  availability: string
) => {
  const hall: Hall = {
    hallId: hallId,
    name: name,
    rows: rowsCount,
    seatsPerRow: seatsPerRow,
    availability: availability === 'Tak',
    numOfSeats: seatsPerRow * rowsCount,
  };
  await apiEditHall(hall);
};

export const getHallsWithHours = async (
  movieId: string,
  date: Moment
): Promise<HallWithHours[]> => {
  const dateString = date.format('YYYY-MM-DD').toString();
  return await apiGetHallsWithHours(movieId, dateString);
};

export const getHallSeats = async (
  screeningId: string
): Promise<HallWithSeats> => {
  return await apiGetHallSeats(screeningId);
};
