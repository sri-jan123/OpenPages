import React from "react";

const API_URL = import.meta.env.VITE_API_URL;

function HomePosts({ post }) {
  return (
    <div className="w-full flex mt-8 space-x-4">

      {/* Left */}
      <div className="w-[30%] h-[175px] flex justify-center items-center">

        {post.photo && (
          <img
            src={`${API_URL}/uploads/${post.photo}`}
            alt="post"
            className="h-full w-full object-cover rounded"
          />
        )}

      </div>

      {/* Right */}
      <div className="flex flex-col w-[65%]">

        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          {post.title}
        </h1>

        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">

          <p>{post.username}</p>

          <div className="flex space-x-2 text-sm">
            <p>
              {post.updatedAt
                ? new Date(post.updatedAt).toString().slice(0, 15)
                : ""}
            </p>

            <p>
              {post.updatedAt
                ? new Date(post.updatedAt).toString().slice(16, 24)
                : ""}
            </p>
          </div>
        </div>

        <p className="text-sm md:text-lg">
          {post.desc?.slice(0, 200)} ...Read more
        </p>

      </div>
    </div>
  );
}

export default HomePosts;