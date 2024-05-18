import React, { createContext, useContext, useState, useEffect } from "react";
import Loading from "../components/Loading";
import { collection } from "firebase/firestore";
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
  const query = collection(
    db,
    "/agri/" + String(currentUser.uid) + "/" + pageName + "/"
  );
  const [snapshot, loadingFirestore, error] = useCollectionData(query);

  console.log(snapshot);

  useEffect(() => {
    setLoading(loadingFirestore !== undefined ? loadingFirestore : true);
    if (snapshot) {
      setDisplayArrayDwa(snapshot[1]);
      setDisplayArrayMousem(snapshot[0]);
    }
  }, [loadingFirestore, snapshot, currentUser.uid]); // Include loadingFirestore and snapshot in the dependency array

  const value = {
    pageName,
    displayArrayMousem,
    displayArrayDwa,
  };

  return (
    <FirestoreContext.Provider value={value}>
      {loading ? <Loading /> : children}
    </FirestoreContext.Provider>
  );
}
