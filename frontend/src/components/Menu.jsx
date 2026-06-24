import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function Menu() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await axios.get(
      `${API_URL}/api/auth/logout`,
      { withCredentials: true }
    );

    localStorage.removeItem("user");

    setUser(null);

    navigate("/login");

  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="bg-black w-[200px] flex flex-col absolute top-12 right-6 md:right-32 p-4 rounded-md space-y-4 z-50">

      {!user && (
        <Link to="/login">
          <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
            Login
          </h3>
        </Link>
      )}

      {!user && (
        <Link to="/register">
          <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
            Register
          </h3>
        </Link>
      )}

      {user && (
        <Link to="/profile">
          <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
            Profile
          </h3>
        </Link>
      )}

      {user && (
        <Link to="/write">
          <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
            Write
          </h3>
        </Link>
      )}

      {user && (
        <h3
          onClick={handleLogout}
          className="text-white text-sm hover:text-gray-500 cursor-pointer"
        >
          Logout
        </h3>
      )}

    </div>
  );
}

export default Menu;