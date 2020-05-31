export interface Film {
  ageCategory: string;
  director: string;
  duration: number;
  movieCategory: string;
  movieId: string;
  releaseDate: string;
  closeDate: string;
  title: string;
}

export interface Category {
  count: number;
  data: string[];
}
