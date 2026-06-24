import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { URL } from "../url";
import { UserContext } from "../context/UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const res = await axios.post(
        `${URL}/api/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      // Save user in context + localStorage
      login(res.data);

      navigate("/");
    } catch (err) {
      console.log(err);

      setError(
        err?.response?.data?.message ||
          "Invalid credentials. Please try again."
      );
    }
  };

  return (
    <div className="w-full flex justify-center items-center h-[70vh]">
      <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">

        <h1 className="text-xl font-bold">
          Login to your account
        </h1>

        <form
          onSubmit={handleLogin}
          className="w-full flex flex-col space-y-4"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border-2 border-black outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border-2 border-black outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full px-4 py-3 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-700"
          >
            Log In
          </button>
        </form>

        <div className="flex justify-center items-center space-x-2">
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