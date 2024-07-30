import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import TopNav from "./TopNav";
import { useAuth } from "../contexts/AuthContext";
import { FirestoreProvider } from "../contexts/FirestoreContext";

function MainPage() {
	const navigate = useNavigate();
	const { userLoggedIn, currentUser } = useAuth();
	useEffect(() => {
		if (!userLoggedIn) {
			navigate("/login");
		}
	}, [userLoggedIn]);
	return (
		<main>
			<TopNav />
			<Nav />
			{window.location.pathname === "/home" ? (
				<div className="main-nav">
					{currentUser?.displayName ? (
						<h1>Welcome {currentUser?.displayName}</h1>
					) : (
						<h1>Welcome</h1>
					)}
					<p>you can navigate between the pages by pressing on button action</p>
				</div>
			) : (
				<FirestoreProvider>
					<Outlet />
				</FirestoreProvider>
			)}
		</main>
	);
}

export default MainPage;
