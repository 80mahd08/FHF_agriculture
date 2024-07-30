import React, { createContext, useContext, useState, useEffect } from "react";
import Loading from "../components/Loading";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuth } from "./AuthContext";

export const FirestoreContext = createContext();

export function useFirestore() {
	return useContext(FirestoreContext);
}

function getPageName(children) {
	return window.location.pathname.split("/")[2];
}

export function FirestoreProvider({ children }) {
	const [loading, setLoading] = useState(true);
	const [displayArrayMousem, setDisplayArrayMousem] = useState();
	const [displayArrayDwa, setDisplayArrayDwa] = useState();
	const pageName = getPageName(children);
	const { currentUser } = useAuth();

	// Fetch data using useCollectionData directly inside the component
	const query = collection(db, `/agri/${currentUser.uid}/${pageName}/`);
	const [snapshot, loadingFirestore, error] = useCollectionData(query);

	useEffect(() => {
		setLoading(loadingFirestore !== undefined ? loadingFirestore : true);
		if (snapshot) {
			setDisplayArrayDwa(snapshot[1]);
			setDisplayArrayMousem(snapshot[0]);
		}
	}, [loadingFirestore, snapshot, currentUser.uid]); // Include loadingFirestore and snapshot in the dependency array

	const submitData = async (type, data) => {
		setLoading(true);
		let queryRef;
		let prevData;

		switch (type) {
			case "dwa":
				queryRef = doc(db, `/agri/${currentUser.uid}/${pageName}/mow3edDwe/`);
				prevData = snapshot[1];
				break;
			case "mousem":
				queryRef = doc(
					db,
					`/agri/${currentUser.uid}/${pageName}/maw3edMousem/`
				);
				prevData = snapshot[0];
				break;
			default:
				console.error("Invalid type");
				return;
		}

		if (prevData) {
			const keys = Object.keys(prevData);
			const lastKey = keys.length > 0 ? keys[keys.length - 1] : "0";
			const newKey = String(Number(lastKey) + 1);
			const newData = { [newKey]: data };

			try {
				await setDoc(queryRef, newData, { merge: true });
			} catch (error) {
				console.error("Error adding document: ", error);
			}
		}
		setLoading(false);
	};

	const value = {
		pageName,
		displayArrayMousem,
		displayArrayDwa,
		submitData,
	};

	return (
		<FirestoreContext.Provider value={value}>
			{loading ? <Loading /> : children}
		</FirestoreContext.Provider>
	);
}
