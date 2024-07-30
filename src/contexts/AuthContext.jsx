import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithPopup,
} from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "../components/Loading";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);
	const [userLoggedIn, setUserLoggedIn] = useState(false);
	const [isEmailUser, setIsEmailUser] = useState(false);
	const [isGoogleUser, setIsGoogleUser] = useState(false);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				initializeUser(user);
			} else {
				setCurrentUser(null);
				setUserLoggedIn(false);
				setLoading(false);
			}
		});
		return unsubscribe;
	}, []);

	const initializeUser = async (user) => {
		setCurrentUser({ ...user });

		const isEmail = user.providerData.some(
			(provider) => provider.providerId === "password"
		);
		setIsEmailUser(isEmail);

		const isGoogle = user.providerData.some(
			(provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID
		);
		setIsGoogleUser(isGoogle);

		try {
			await createDocumentStructure(user.uid); // Ensure this is called
		} catch (error) {
			console.error("Error initializing user:", error);
		}

		setUserLoggedIn(true);
		setLoading(false);
	};

	const registerUserWithEmail = async (email, password) => {
		try {
			const { user } = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			await createDocumentStructure(user.uid);
			initializeUser(user);
		} catch (error) {
			console.error("Error creating user with email:", error);
		}
	};

	const registerUserWithGoogle = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const { user } = await signInWithPopup(auth, provider);
			await createDocumentStructure(user.uid);
			initializeUser(user);
		} catch (error) {
			console.error("Error signing in with Google:", error);
		}
	};

	const createDocumentStructure = async (uid) => {
		const userRef = doc(db, "agri", uid);

		try {
			// Attempt to set the document with merge option to update if it exists
			await setDoc(userRef, {}, { merge: true });

			// Create subcollections within the user document (empty)
			const subcollections = ["zitoun", "lim", "kook"];
			const documents = ["mow3edDwe", "maw3edMousem"];

			for (const subcollection of subcollections) {
				for (const docName of documents) {
					const subcollectionRef = collection(userRef, subcollection);
					const docRef = doc(subcollectionRef, docName);
					await setDoc(docRef, {}, { merge: true });
				}
			}
		} catch (error) {
			console.error("Error creating or updating document structure:", error);
		}
	};

	const value = {
		userLoggedIn,
		isEmailUser,
		isGoogleUser,
		currentUser,
		setCurrentUser,
		registerUserWithEmail,
		registerUserWithGoogle,
		setLoading,
	};

	return (
		<AuthContext.Provider value={value}>
			{loading ? <Loading /> : children}
		</AuthContext.Provider>
	);
}
