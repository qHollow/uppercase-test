import "./style.css";

import { type FormEvent, useEffect, useState } from "react";

import { URL_PARAM_PAGE, URL_PARAM_SEARCH } from "@/shared/constants";
import { useUrlParam } from "@/shared/lib";
import {
	isMoviesResponse,
	type Movie,
	type OmdbResponse,
} from "@/shared/types";
import { Avatar, Chip, Search } from "@/shared/ui";
import { Movies } from "@/widgets";

interface FormElements extends HTMLFormControlsCollection {
	search: HTMLInputElement;
}

interface SearchForm extends HTMLFormElement {
	readonly elements: FormElements;
}

export const App = () => {
	const { getUrlParam, setUrlParam } = useUrlParam();

	const [movies, setMovies] = useState<Movie[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [totalResults, setTotalResults] = useState(0);
	const [error, setError] = useState("");
	const [search, setSearch] = useState(() => getUrlParam(URL_PARAM_SEARCH, ""));
	const [page, setPage] = useState(() =>
		Number(getUrlParam(URL_PARAM_PAGE, "1"))
	);

	const fetchData = async () => {
		if (search.trim() === "") {
			return;
		}

		setError("");
		setIsLoading(true);

		try {
			const res = await fetch(
				`https://www.omdbapi.com/?i=tt3896198&apikey=8523cbb8&s=${getUrlParam(
					URL_PARAM_SEARCH,
					""
				)}&page=${page}`
			);
			const data: OmdbResponse = await res.json();

			if (isMoviesResponse(data)) {
				setMovies(data.Search);
				setTotalResults(+data.totalResults);
			} else {
				setError(data.Error);
			}
		} catch (error) {
			console.log(error);
		}

		setIsLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, [page]);

	const handleSubmit = async (event: FormEvent<SearchForm>) => {
		event.preventDefault();

		const value = event.currentTarget.elements.search.value;

		if (value.trim() === "" || value === getUrlParam(URL_PARAM_SEARCH, "")) {
			return;
		}

		setUrlParam(URL_PARAM_PAGE, "1");
		setUrlParam(URL_PARAM_SEARCH, value);
		setPage(1);

		fetchData();
	};

	return (
		<main className="main">
			<header className="header">
				<img src="/logo.png" alt="Uppersetup logo" />
				<form onSubmit={handleSubmit}>
					<Search
						name="search"
						placeholder="Type something to search"
						value={search}
						onChange={(e) => {
							setSearch(e.target.value);
						}}
					/>
				</form>
				<Avatar nickname="xoladeol" />
			</header>
			{movies?.length > 0 && !error && (
				<section className="search-info">
					<p className="search-info__text">
						You searched for:{" "}
						<span className="search-info__search-phrase">
							{getUrlParam(URL_PARAM_SEARCH, "")}
						</span>
					</p>
					<Chip>{totalResults} result</Chip>
				</section>
			)}
			<Movies
				isLoading={isLoading}
				error={error}
				movies={movies}
				page={page}
				setPage={setPage}
				totalResults={totalResults}
			/>
		</main>
	);
};
