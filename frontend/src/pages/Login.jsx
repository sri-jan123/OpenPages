import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const API_URL = import.meta.env.VITE_API_URL;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    try {
      setError(false);

      const res = await axios.post(
        `${API_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));

      navigate("/");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return (
    <div className="w-full flex justify-center items-center h-[70vh]">

      <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%] ">

        <h1 className="text-xl font-bold text-left">
          Login to your account
        </h1>

        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-2 border-black border-2"
        />

        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full px-4 py-2 border-black border-2 "
        />

        {error && (
          <p className="text-red-500 text-sm">
            Invalid credentials. Please try again.
          </p>
        )}

        <button
          onClick={handleLogin}
          className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black"
        >
          Log In
        </button>

        <div className="flex justify-center items-center space-x-4">
          <p>New here?</p>
          <Link to="/register">
            <p className="text-gray-500 hover:text-black">
              Register
            </p>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;