export interface NewScreening {
  time: string;
  date: string;
  hallId: string;
  movieId: string;
}

export interface Screening extends NewScreening {
  seanceId: string;
  ticketsSold: number;
  hall: string;
  movie: string;
}
