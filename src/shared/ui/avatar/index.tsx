import "./style.css";

interface Props {
	nickname: string;
}

export const Avatar = ({ nickname }: Props) => {
	return (
		<div className="avatar">
			<img src="/user.svg" alt="User icon" />
			<span className="avatar__nickname">{nickname}</span>
		</div>
	);
};
