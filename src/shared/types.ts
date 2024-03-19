export interface Movie {
	Title: string;
	Year: string;
	imdbID: string;
	Type: string;
	Poster: string;
}

export interface MovieResponse {
	Search: Movie[];
	totalResults: string;
	Response: string;
}

export interface MovieError {
	Response: string;
	Error: string;
}

export type OmdbResponse = MovieResponse | MovieError;

export const isMoviesResponse = (
	response: OmdbResponse
): response is MovieResponse => {
	return (response as MovieResponse).totalResults !== undefined;
};
