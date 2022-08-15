import { useState, FormEvent, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import {
	googleSignInStart,
	emailSignInStart,
} from "../../store/user/user.action";

import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { BUTTON_TYPE } from "../button/button.component";

import "./sign-in-form.styles.scss";
import { AuthError, AuthErrorCodes } from "firebase/auth";

const defaultFormFields = {
	email: "",
	password: "",
};

const SignInForm = () => {
	const dispatch = useDispatch();
	const [formFields, setFormFields] = useState(defaultFormFields);

	const signInWithGoogle = async () => {
		dispatch(googleSignInStart());
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setFormFields({ ...formFields, [event.target.name]: event.target.value });
	};

	// const resetFormFields = () => {
	// 	setFormFields(defaultFormFields);
	// };

	const onSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			dispatch(emailSignInStart(formFields.email, formFields.password));
		} catch (err) {
			switch ((err as AuthError).code) {
				case AuthErrorCodes.INVALID_PASSWORD: {
					alert("Incorrect password or email");
					break;
				}
				case  AuthErrorCodes.USER_DELETED: {
					alert("No account is associated with this email");
					break;
				}
				default:
					alert("Unknown error has occurred");
			}

			console.log("User sign-in failed", err);
		}
	};

	return (
		<div className="sign-in-container">
			<h2>I already have an account</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={onSubmitForm}>
				<FormInput
					label="Email"
					type="email"
					required
					name="email"
					onChange={handleChange}
					value={formFields.email}
				/>
				<FormInput
					label="Password"
					type="password"
					required
					name="password"
					onChange={handleChange}
					value={formFields.password}
				/>

				<div className="buttons-container">
					<Button type="submit">SIGN IN</Button>
					<Button
						type="button"
						buttonType={BUTTON_TYPE.google}
						onClick={signInWithGoogle}
					>
						GOOGLE SIGN IN
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
