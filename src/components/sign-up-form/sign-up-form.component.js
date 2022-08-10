import { useState } from "react";
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-up-form.styles.scss";

const defaultFormFields = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const handleChange = (event) => {
		setFormFields({ ...formFields, [event.target.name]: event.target.value });
	};

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		// Confirm that the passwords match
		if (password !== confirmPassword) {
			alert("ERROR: Passwords do NOT match!");
			return;
		}

		try {
			// See if we've authenticated that user with email and password
			const { user } = await createAuthUserWithEmailAndPassword(
				email,
				password
			);

			await createUserDocumentFromAuth(user, { displayName });

			resetFormFields();
		} catch (err) {
			if (err.code === "auth/email-already-in-use") {
				alert("ERROR: Email is already in use!");
			}
			console.log("ERROR occurred attempting to sign-up user", err);
		}
	};

	return (
		<div className="sign-up-container">
			<h2>Don't have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Display Name"
					type="text"
					required
					name="displayName"
					onChange={handleChange}
					value={displayName}
				/>

				<FormInput
					label="Email"
					type="email"
					required
					name="email"
					onChange={handleChange}
					value={email}
				/>

				<FormInput
					label="Password"
					type="password"
					required
					name="password"
					onChange={handleChange}
					value={password}
				/>
				<FormInput
					label="Confirm Password"
					type="password"
					required
					name="confirmPassword"
					onChange={handleChange}
					value={confirmPassword}
				/>

				<Button type="submit">Sign up</Button>
			</form>
		</div>
	);
};

export default SignUpForm;
