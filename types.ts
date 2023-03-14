export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    genre_ids: number[];
  }
  
  export interface Movies {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  }
  
  export interface Genre {
    id: number;
    name: string;
  }
  
  export interface MovieCardProps {
    movie: Movie;
  }