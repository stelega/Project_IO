import { Hall, NewHall } from '../models/Hall';
import {
  apiGetHalls,
  apiAddHall,
  apiGetHall,
  apiEditHall,
  apiDeleteHall,
} from '../api/hallsApi';
import { PagedList } from '../models/PagedList';

export const getHalls = async (
  rowsPerPage?: number,
  page?: number,
  orderBy?: string,
  order?: 'asc' | 'desc'
): Promise<PagedList<Hall>> => {
  return await apiGetHalls(rowsPerPage, page, orderBy, order);
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
  const hall: Hall = await apiGetHall(hallId);
  return hall;
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
