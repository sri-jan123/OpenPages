import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ProfilePosts from "../components/ProfilePosts";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user.username);

      fetchPosts();
    }
  }, [user]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/posts/user/${user._id}`
      );

      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // UPDATE USER
  const handleUpdate = async () => {
    try {
      const body = {
        username
      };

      if (password.trim()) {
        body.password = password;
      }

      const res = await axios.put(
        `${API_URL}/api/users/${user._id}`,
        body,
        {
          withCredentials: true,
        }
      );

      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));

      setPassword("");

      alert("Profile updated successfully");
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE ACCOUNT
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${API_URL}/api/users/${user._id}`,
        {
          withCredentials: true,
        }
      );

      localStorage.removeItem("user");
      setUser(null);

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
  <div className="px-8 md:px-[200px] mt-20">

    <div className="grid md:grid-cols-[2fr_1fr] gap-10">

      {/* LEFT SIDE */}
      <div>

        <h1 className="text-2xl font-bold mb-6">
          Your Posts
        </h1>

        <div className="flex flex-col">
          {posts.length > 0 ? (
            posts.map((post) => (
              <ProfilePosts
                key={post._id}
                post={post}
              />
            ))
          ) : (
            <p>No posts found.</p>
          )}
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div>

        <div className="border p-6 rounded-lg shadow-lg flex flex-col gap-4 sticky top-24">

          <h1 className="text-2xl font-bold">
            Profile
          </h1>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border px-4 py-2 outline-none"
          />

          <input
            type="email"
            value={user?.email}
            readOnly
            className="border px-4 py-2 bg-gray-100"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            className="border px-4 py-2 outline-none"
          />

          <button
            onClick={handleUpdate}
            className="bg-black text-white py-2 rounded"
          >
            Update Profile
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-600 text-white py-2 rounded"
          >
            Delete Account
          </button>

        </div>

      </div>

    </div>
  </div>
);
}

export default Profile;