import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { SignInWithEmailAndPassword, SignInWithGoogle } from "../auth";

function Login() {
  const [isSigningIn, setIsSigningIn] = useState(false);

  const navigate = useNavigate();

  const { userLoggedIn } = useAuth();

  useEffect(() => {
    if (userLoggedIn) {
      navigate("/home");
    }
  }, [userLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await SignInWithEmailAndPassword(email.value, password.value);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
        });
      }
    }
  };

  const handleSubmitUsingGoogle = (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      SignInWithGoogle().catch((error) => {
        setIsSigningIn(false);
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
        });
      });
    }
  };

  return (
    <>
      <div className="login">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <br />
          <input type="email" name="email" placeholder="email" />
          <br />
          <label htmlFor="password">Password:</label>
          <br />
          <input type="password" name="password" placeholder="password" />
          <br />
          <input type="submit" value="login" />
        </form>
      </div>
      <div>
        i don't have a account ? <Link to="/register">Sign up</Link>
      </div>
      <div>
        <button onClick={handleSubmitUsingGoogle}>login with google</button>
      </div>
    </>
  );
}

export default Login;
