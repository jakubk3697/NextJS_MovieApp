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
  
  /**
   * @description map(arg0: (movie: Movie) => JSX.Element) means that map function takes a function as an argument and returns a ReactNode
   * @example map((movie: Movie) => <MovieCard movie={movie} />)
   */
  export interface Movies {
    map(arg0: (movie: Movie) => JSX.Element): import("react").ReactNode;
  }
  
  export interface Genre {
    id: number;
    name: string;
  }
  
  export interface MovieCardProps {
    movie: Movie;
  }