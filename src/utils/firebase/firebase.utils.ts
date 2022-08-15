import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	User,
	NextOrObserver
} from "firebase/auth";

import {
	getFirestore,
	doc,
	getDoc,
	getDocs,
	setDoc,
	collection,
	writeBatch,
	query,
	QueryDocumentSnapshot
} from "firebase/firestore";

import { Category } from "../../store/categories/category.types";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyC12RJS31mZ_41pPjqwVfMHN0bmpc-jW4E",

	authDomain: "husk-clothing-db.firebaseapp.com",

	projectId: "husk-clothing-db",

	storageBucket: "husk-clothing-db.appspot.com",

	messagingSenderId: "821551747861",

	appId: "1:821551747861:web:d23d230403e2c38cfc4f1c",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
	prompt: "select_account", // Forces the user to select an account
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
	signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export type ObjectToAdd = {
	title: string;
}

export const addCollectionAndDocuments = async <T extends ObjectToAdd> (
	collectionKey: string,
	objectsToAdd: T[],
): Promise<void> => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());

		batch.set(docRef, object);
	});

	await batch.commit();
};

export const getCategoriesAndDocuments = async (collectionKey: string): Promise<Category[]> => {
	const collectionRef = collection(db, collectionKey);
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as Category);
};

export type AdditionalInformation = {
	displayName?: string;
}

export type UserData = {
	createdAt: Date;
	displayName: string;
	email: string;
}

export const createUserDocumentFromAuth = async (
	userAuth: User,
	additionalInfo = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
	if (!userAuth) return;

	const userDocRef = doc(db, "users", userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createAt,
				...additionalInfo,
			});
		} catch (err) {
			console.log(
				"ERROR: An error occurred when attempting to create the user",
				err
			);
		}
	}

	return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
	onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
	return new Promise((resolve, reject) => {
		const unsubscribe = onAuthStateChanged(
			auth,
			(userAuth) => {
				unsubscribe();
				resolve(userAuth);
			},
			reject
		);
	});
};
