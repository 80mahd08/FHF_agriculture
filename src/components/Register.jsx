// Signup.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../contexts/AuthContext";
import { CreateUserWithEmailAndPassword, SendEmailVerification } from "../auth";

function Signup() {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    if (userLoggedIn) {
      navigate("/home");
    }
  }, [userLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = e.target;

    if (password.value !== confirmPassword.value) {
      Swal.fire({
        title: "Error",
        text: "Passwords do not match",
        icon: "error",
      });
      return;
    }

    if (!isRegistering) {
      setIsRegistering(true);
      try {
        await CreateUserWithEmailAndPassword(email.value, password.value);
        await SendEmailVerification();
        Swal.fire({
          title: "Success",
          text: "Account created successfully. Please verify your email (we sent you a verification link).",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
        });
      } finally {
        setIsRegistering(false);
      }
    }
  };

  return (
    <>
      <div className="signup">
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email address"
            required
          />
          <br />

          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            minLength="6"
            required
          />
          <br />
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <br />
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            minLength="6"
            required
          />
          <br />
          <button type="submit" disabled={isRegistering}>
            Sign up
          </button>
        </form>
      </div>
      <div className="alrHaveAnAccount">
        Already have an account? <Link to={"/login"}>log in</Link>
      </div>
    </>
  );
}

export default Signup;
