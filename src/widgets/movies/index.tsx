import "./style.css";

import { memo } from "react";

import { useUrlParam } from "@/shared/lib";
import { Movie } from "@/shared/types";
import { Card, Loader, Pagination } from "@/shared/ui";

interface Props {
	isLoading: boolean;
	error: string;
	movies: Movie[];
	page: number;
	setPage: (newPage: number) => void;
	totalResults: number;
}

export const Movies = memo(
	({ isLoading, error, movies, page, setPage, totalResults }: Props) => {
		const { setUrlParam } = useUrlParam();
		return (
			<>
				<section className="cards">
					{isLoading && <Loader />}
					{!isLoading && Boolean(error) && <p className="error">{error}</p>}
					{!isLoading &&
						!error &&
						movies?.map(({ imdbID, Poster, Title, Type, Year }) => (
							<Card
								key={imdbID}
								movie={{
									imdbID,
									Poster,
									Title,
									Type,
									Year,
								}}
							></Card>
						))}
				</section>
				{movies?.length > 0 && (
					<div className="pagination">
						<Pagination
							itemsCount={totalResults}
							currentPage={page}
							itemsPerPage={10}
							onPageChange={(newPage) => {
								setUrlParam("page", newPage.toString());
								setPage(newPage);
							}}
						/>
					</div>
				)}
			</>
		);
	}
);
