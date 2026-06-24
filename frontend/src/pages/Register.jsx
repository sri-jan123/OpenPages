import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const handleRegister = async () => {
    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError(false);

      const res = await axios.post(
        `${URL}/api/auth/register`,
        { username, email, password },
        { withCredentials: true }
      );

      // Optional: auto login after register
      login(res.data);

      navigate("/login"); // or "/" if you want auto login experience
    } catch (err) {
      console.log(err);
      setError(
        err?.response?.data || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center h-[70vh]">
      <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">

        <h1 className="text-xl font-bold">Create an account</h1>

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="w-full px-4 py-2 border-black border-2"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-2 border-black border-2"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full px-4 py-2 border-black border-2"
        />

        {error && (
          <h3 className="text-red-500 text-sm">
            {error}
          </h3>
        )}

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <div className="flex justify-center items-center space-x-4">
          <p>Already a user?</p>
          <Link to="/login">
            <p className="text-gray-500 hover:text-black">
              Login
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;