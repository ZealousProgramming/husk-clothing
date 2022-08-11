import { useState } from "react";

import {
	signInWithGooglePopup,
	signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
	email: "",
	password: "",
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);

	const signInWithGoogle = async () => {
		await signInWithGooglePopup();
	};

	const handleChange = (event) => {
		setFormFields({ ...formFields, [event.target.name]: event.target.value });
	};

	// const resetFormFields = () => {
	// 	setFormFields(defaultFormFields);
	// };

	const onSubmitForm = async (event) => {
		event.preventDefault();

		try {
			await signInAuthUserWithEmailAndPassword(
				formFields.email,
				formFields.password
			);

			// resetFormFields();
		} catch (err) {
			switch (err.code) {
				case "auth/wrong-password": {
					alert("Incorrect password or email");
					break;
				}
				case "auth/user-not-found": {
					alert("No account is associated with this email");
					break;
				}
				default:
					alert("Unknown error has occurred");
			}

			console.log(err);
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
					<Button type="button" buttonType="google" onClick={signInWithGoogle}>
						GOOGLE SIGN IN
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
