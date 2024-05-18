import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainPage from "./components/MainPage";
import Register from "./components/Register";
import Login from "./components/Login";
import { AuthProvider } from "./contexts/AuthContext";
import { Container } from "fhf-react";
import Kook from "./components/Kook";
import Lim from "./components/Lim";
import Zitoun from "./components/Zitoun";

const router = createBrowserRouter([
  { path: "*", element: <Login /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
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
    <Container>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Container>
  </React.StrictMode>
);
