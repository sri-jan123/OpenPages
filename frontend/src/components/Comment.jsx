import React, { useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const API_URL = import.meta.env.VITE_API_URL;

function Comment({ comment, refreshComments }) {
  const { user } = useContext(UserContext);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${API_URL}/api/comments/${comment._id}`,
        {
          withCredentials: true,
        }
      );

      refreshComments();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="border rounded-lg p-4 mb-4">

      <div className="flex justify-between items-center">

        <div>
          <p className="font-semibold">
            @{comment.author}
          </p>

          <p className="text-gray-500 text-sm">
            {new Date(comment.createdAt).toLocaleString()}
          </p>
        </div>

        {/* Show delete button only for owner */}
        {user?._id === comment.userId && (
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        )}

      </div>

      <p className="mt-3">
        {comment.comment}
      </p>

    </div>
  );
}

export default Comment;