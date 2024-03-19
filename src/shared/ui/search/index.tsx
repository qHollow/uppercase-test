import "./style.css";

import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export const Search = (props: Props) => {
	return (
		<search className="search">
			<input
				className="search__input"
				type="text"
				inputMode="text"
				autoComplete="search"
				{...props}
			/>
			<span className="search__icon">
				<img src="/search.svg" aria-hidden="true" />
			</span>
		</search>
	);
};
