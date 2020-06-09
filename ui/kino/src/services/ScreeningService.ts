import {
  apiDeleteScreening,
  apiGetScreenings,
  apiAddScreening,
} from '../api/screeningsApi';
import { PagedList } from '../models/PagedList';
import { Screening, NewScreening } from '../models/Screening';
import { Moment } from 'moment';

export const getScreenings = async (
  rowsPerPage?: number,
  page?: number,
  orderBy?: string,
  order?: 'asc' | 'desc',
  search?: string
): Promise<PagedList<Screening>> => {
  return await apiGetScreenings(rowsPerPage, page, orderBy, order, search);
};

export const deleteScreening = async (seanceId: string) => {
  await apiDeleteScreening(seanceId);
};

export const addScreening = async (
  filmId: string,
  date: Moment,
  hallId: string,
  hour: string
) => {
  const screening: NewScreening = {
    movieId: filmId,
    date: date.format('YYYY-MM-DD').toString(),
    hallId: hallId,
    time: hour,
  };
  await apiAddScreening(screening);
};
