import "./style.css";

import { DOTS, usePagination } from "@/shared/lib";

interface Props {
	itemsCount: number;
	itemsPerPage: number;
	currentPage: number;
	onPageChange: (newPage: number) => void;
}

export const Pagination = ({
	itemsCount,
	onPageChange,
	itemsPerPage,
	currentPage,
}: Props) => {
	const pagesCount = Math.ceil(itemsCount / itemsPerPage);

	const paginationItems = usePagination({
		itemsCount,
		itemsPerPage,
		currentPage,
	});

	const handlePageChange = (page: number) => {
		if (page < 1 || page > itemsCount) {
			return;
		}
		onPageChange(page);
	};

	return (
		<nav className="pagination" aria-label="pagination navigation">
			<ul className="pagination__list">
				<li className="pagination__item">
					<button
						aria-label="Go next previus page"
						className="pagination__button pagination__button--prev"
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}
					>
						<img src="/left.svg" width={12} height={12} aria-hidden="true" />
					</button>
				</li>
				{paginationItems?.map((pageNumber, idx) => {
					if (pageNumber === DOTS) {
						return (
							<li key={`${pageNumber}${idx}`} className="pagination__button">
								...
							</li>
						);
					}
					return (
						<li key={`${pageNumber}${idx}`}>
							<button
								className={`pagination__button ${
									currentPage === pageNumber && "pagination__button--active"
								}`}
								onClick={() => handlePageChange(pageNumber)}
								disabled={currentPage == pageNumber}
							>
								{pageNumber}
							</button>
						</li>
					);
				})}
				<li className="pagination__item">
					<button
						aria-label="Go next to page"
						className="pagination__button pagination__button--next"
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === pagesCount}
					>
						<img src="/right.svg" width={12} height={12} aria-hidden="true" />
					</button>
				</li>
			</ul>
		</nav>
	);
};
