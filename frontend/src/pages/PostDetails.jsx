import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { URL } from "../url";

function PostDetails() {
  const { id } = useParams();

  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${URL}/api/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPost();
  }, [id]);

  return (
    <div className="px-8 md:px-[200px] mt-8">

      {/* Title */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold">
          {post.title}
        </h1>
      </div>

      {/* Author + Date */}
      <div className="flex justify-between mt-4">
        <p>@{post.username}</p>

        <div className="flex gap-2 text-sm">
          <p>
            {post.createdAt
              ? new Date(post.createdAt).toLocaleDateString()
              : ""}
          </p>

          <p>
            {post.createdAt
              ? new Date(post.createdAt).toLocaleTimeString()
              : ""}
          </p>
        </div>
      </div>

      {/* Image */}
     {post.photo && (
  <img
    src={`${URL}/uploads/${post.photo}`}
    alt="post"
    className="w-2/4 max-w-3xl h-auto rounded-lg object-cover mx-auto mt-6"
  />
)}

      {/* Description */}
      <p className="mt-8 whitespace-pre-wrap">
        {post.desc}
      </p>

      {/* Categories */}
      <div className="flex items-center gap-4 mt-8">
        <p className="font-semibold">Categories</p>

        <div className="flex flex-wrap gap-2">
          {post.categories?.map((cat, index) => (
            <div
              key={index}
              className="bg-gray-300 px-3 py-1 rounded-lg"
            >
              {cat}
            </div>
          ))}
        </div>
      </div>

      {/* Comments */}
      <h3 className="mt-8 mb-4 font-semibold">
        Comments
      </h3>

      <div className="flex flex-col md:flex-row w-full">
        <input
          type="text"
          placeholder="Write a comment"
          className="md:w-[80%] border px-4 py-2 outline-none"
        />

        <button className="bg-black text-white md:w-[20%] px-4 py-2">
          Add Comment
        </button>
      </div>
    </div>
  );
}

export default PostDetails;