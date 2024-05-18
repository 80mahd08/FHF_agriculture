import { mergeStyles, styles } from "fhf-react";
import React from "react";
import placeHolderImg from "../../public/placeholderProfImg.jpg";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { SignOut } from "../auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function TopNav() {
  const { currentUser } = useAuth();
  const [dispBtnNav, setDispBtnNav] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await SignOut();
      setDispBtnNav(false);
      navigate("/login");
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };
  return (
    <>
      <div className="top-nav">
        <h1>FHF Agriculture</h1>
        <button onClick={() => setDispBtnNav((prev) => !prev)}>
          {currentUser?.providerData?.[0]?.photoURL ? (
            <LazyLoadImage src={currentUser?.providerData[0].photoURL} />
          ) : (
            <LazyLoadImage src={placeHolderImg} />
          )}
        </button>
      </div>

      <div
        className="bottom-nav"
        style={mergeStyles(
          styles.positionAbsolute,
          styles.bg("white"),
          dispBtnNav ? styles.dispFlex : styles.dispNone
        )}
      >
        <p>Logged in as {currentUser?.displayName || "Unknown User"}</p>
        <p>Email: {currentUser?.email}</p>

        <button
          onClick={() => {
            handleLogout();
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
}

export default TopNav;
