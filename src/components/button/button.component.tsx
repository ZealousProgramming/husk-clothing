import { ButtonHTMLAttributes, FunctionComponent, ReactNode } from "react";
import "./button.styles.scss";

export enum BUTTON_TYPE {
	google = "google-sign-in",
	inverted = "inverted",
}

export type ButtonProps = {
	buttonType?: BUTTON_TYPE;
	children?: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FunctionComponent<ButtonProps> = ({ children, buttonType, ...otherProps }) => {
	return (
		<button
			className={`button-container ${buttonType}`}
			{...otherProps}
		>
			{children}
		</button>
	);
};

export default Button;
