import { PagedList } from './../models/PagedList';
import { Film } from '../models/Film';

export const getFilms = (): PagedList<Film> => {
  return {
    count: 6,
    data: [
      {
        ageCategory: '16+',
        director: 'Janek',
        duration: 155,
        movieCategory: 'Action',
        movieId: '5b7a6629-03ca-4bed-969b-263265cf1c81',
        releaseDate: '01-01-2001',
        closeDate: '29-01-2001',
        title: 'jeden',
      },
      {
        ageCategory: '16+',
        director: 'Janek',
        duration: 155,
        movieCategory: 'Action',
        movieId: '5b7a6629-03ca-4bed-969b-263265cf1c82',
        releaseDate: '01-01-2001',
        closeDate: '29-01-2001',
        title: 'dwa 2',
      },
      {
        ageCategory: '16+',
        director: 'Janek',
        duration: 155,
        movieCategory: 'Action',
        movieId: '5b7a6629-03ca-4bed-969b-263265cf1c83',
        releaseDate: '01-01-2001',
        closeDate: '29-01-2001',
        title: 'trzy 3',
      },
      {
        ageCategory: '16+',
        director: 'Janek',
        duration: 155,
        movieCategory: 'Action',
        movieId: '5b7a6629-03ca-4bed-969b-263265cf1c84',
        releaseDate: '01-01-2001',
        closeDate: '29-01-2001',
        title: 'jeden',
      },
      {
        ageCategory: '16+',
        director: 'Janek',
        duration: 155,
        movieCategory: 'Action',
        movieId: '5b7a6629-03ca-4bed-969b-263265cf1c85',
        releaseDate: '01-01-2001',
        closeDate: '29-01-2001',
        title: 'dwa 2',
      },
      {
        ageCategory: '16+',
        director: 'Janek',
        duration: 155,
        movieCategory: 'Action',
        movieId: '5b7a6629-03ca-4bed-969b-263265cf1c86',
        releaseDate: '01-01-2001',
        closeDate: '29-01-2001',
        title: 'trzy 3',
      },
    ],
  };
};
