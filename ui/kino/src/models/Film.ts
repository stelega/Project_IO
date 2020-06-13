export interface NewFilm {
  ageCategory: string;
  director: string;
  duration: number;
  movieCategory: string;
  releaseDate: string;
  closeDate: string;
  title: string;
}

export interface Film extends NewFilm {
  movieId: string;
}

export interface Category {
  count: number;
  data: string[];
}

export interface FutureFilms {
  data: Film[];
}

export interface FilmsTitles {
  data: string[];
}
