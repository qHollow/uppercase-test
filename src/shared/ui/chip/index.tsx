import "./style.css";

import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

export const Chip = ({ children }: Props) => {
	return <div className="chip">{children}</div>;
};
