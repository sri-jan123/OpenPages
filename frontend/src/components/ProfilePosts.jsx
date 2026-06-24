import React from "react";
import { Link } from "react-router-dom";
import { URL } from "../url";

function ProfilePosts({ post }) {
  return (
    <Link to={`/posts/post/${post._id}`}
    className="block w-full">
      <div className="flex w-full gap-4 items-start border-b pb-6 mt-6">

        {/* Left */}
        <div className="w-[35%] h-[200px] flex justify-center items-center flex-shrink-0">

          {post.photo && (
            <img
              src={`${URL}/uploads/${post.photo}`}
              alt="post"
              className="h-full w-full object-cover rounded"
            />
          )}

        </div>

        {/* Right */}
        <div className="flex flex-col flex-1">

          <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
            {post.title}
          </h1>

          <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">

            <p>@{post.username}</p>

            <div className="flex space-x-2 text-sm">

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

          <p className="text-sm md:text-lg">
            {post.desc?.slice(0, 200)} ...Read more
          </p>

        </div>

      </div>
    </Link>
  );
}

export default ProfilePosts;