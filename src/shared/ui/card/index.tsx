import "./style.css";

import { type Movie } from "@/shared/types";

interface Props {
	movie: Movie;
}

const NO_POSTER = "N/A";

export const Card = ({ movie }: Props) => {
	const { Title, Year, imdbID, Poster, Type } = movie;

	return (
		<div className="card">
			<div className="card__image">
				{Poster !== NO_POSTER && (
					<img src={Poster} alt={`${Title} poster`} width={245} height={270} />
				)}
				{Poster === NO_POSTER && (
					<img src="/placeholder.png" alt="Poster not available" />
				)}
			</div>
			<div className="card__info">
				<p>Name: {Title}</p>
				<p>Year: {Year}</p>
				<p>imdbID: {imdbID}</p>
				<p>Type: {Type}</p>
			</div>
		</div>
	);
};
