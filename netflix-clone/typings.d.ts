export interface Movie {
  adult: boolean;
  title: string;
  backdrop_path: string;
  media_type?: string;
  release_date?: string;
  genre_ids: number[];
  genres: Genre[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average?: number;
  vote_count: number;
}

export interface Genre {
  id: number;
  name: string;
}
