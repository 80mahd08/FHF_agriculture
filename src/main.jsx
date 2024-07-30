import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainPage from "./components/MainPage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { AuthProvider } from "./contexts/AuthContext";
import { Container } from "fhf-react";
import Kook from "./components/Kook";
import Lim from "./components/Lim";
import Zitoun from "./components/Zitoun";
import { ChakraProvider } from "@chakra-ui/react";

const router = createBrowserRouter([
	{ path: "*", element: <Login /> },
	{ path: "/login", element: <Login /> },
	{ path: "/signup", element: <Signup /> },
	{
		path: "/home",
		element: <MainPage />,
		children: [
			{
				path: "/home/zitoun",
				element: <Zitoun />,
			},
			{
				path: "/home/kook",
				element: <Kook />,
			},
			{
				path: "/home/lim",
				element: <Lim />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ChakraProvider>
			<Container>
				<AuthProvider>
					<RouterProvider router={router} />
				</AuthProvider>
			</Container>
		</ChakraProvider>
	</React.StrictMode>
);

function setFullViewport() {
	const html = document.documentElement;
	const body = document.body;
	const width = window.innerWidth + "px";

	html.style.width = width;
	body.style.width = width;
}

// Set the initial width and height
setFullViewport();

// Update the width and height on window resize
window.addEventListener("resize", setFullViewport);
