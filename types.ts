import { FormEventHandler } from "react";

export interface Movie {
  runtime: number;
  genres: { id: number; name: string; }[];
  tagline: string;
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  length: any;
  }
  
  /**
   * @description map(arg0: (movie: Movie) => JSX.Element) means that map function takes a function as an argument and returns a ReactNode
   * @example map((movie: Movie) => <MovieCard movie={movie} />)
   */
  export interface Movies {
    length: any;
    map(arg0: (movie: Movie) => JSX.Element): import("react").ReactNode;
  }
  
  export interface Genre {
    id: number;
    name: string;
  }
  
  export interface MovieCardProps {
    movie: Movie;
    genres: Genre[];
  }

 export interface CommentProps {
    id: string;
    author: string;
    title: string;
    content: string;
}

export interface CommentsProps {
    map(arg0: (comment: CommentProps) => JSX.Element): import("react").ReactNode;
    comments: CommentProps[];
}

export interface CommentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddComment: (commentData: { title: string | undefined; content: string | undefined; author: string | undefined; }) => void;
}

export interface CommentsForm {
  title: RegExp;
  content: RegExp;
  author: RegExp;
}

export interface SignFormProps {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  title: string;
  emailRef: React.RefObject<HTMLInputElement>;
  passwordRef: React.RefObject<HTMLInputElement>;
  redirectTitle: string;
  redirectText: string;
  redirectRoute: string;
  errorMessage: string,
}