import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Comment from "../components/Comment";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

function PostDetails() {
  const { id } = useParams();

  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // ---------------- Fetch Post ----------------
  const fetchPost = async () => {
    try {
      const res = await axios.get(`${URL}/api/posts/${id}`);
      setPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- Fetch Comments ----------------
  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/comments/post/${id}`
      );

      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- Fetch Like Count ----------------
  const fetchLikes = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/likes/${id}`
      );

      setLikeCount(res.data.count);
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- Check User Like Status ----------------
  const fetchLikeStatus = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/likes/status/${id}`,
        {
          withCredentials: true
        }
      );

      setLiked(res.data.liked);
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- Toggle Like ----------------
  const handleLike = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/api/likes/toggle/${id}`,
        {},
        {
          withCredentials: true
        }
      );

      setLiked(res.data.liked);

      if (res.data.liked) {
        setLikeCount((prev) => prev + 1);
      } else {
        setLikeCount((prev) => prev - 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- Add Comment ----------------
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      await axios.post(
        `${API_URL}/api/comments/create`,
        {
          comment: newComment,
          postId: id
        },
        {
          withCredentials: true
        }
      );

      setNewComment("");
      fetchComments();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
    fetchLikes();
    fetchLikeStatus();
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
      {/* <div dangerouslySetInnerHTML={{ __html: post.desc }} /> */}

      {/* Like Section */}
      <div className="flex items-center gap-3 mt-8">

        <button
          onClick={handleLike}
          className="text-2xl"
        >
          {liked ? (
            <FaHeart className="text-red-600" />
          ) : (
            <FaRegHeart />
          )}
        </button>

        <p className="font-semibold">
          {likeCount} Likes
        </p>

      </div>

      {/* Categories */}
      <div className="flex items-center gap-4 mt-8">
        <p className="font-semibold">
          Categories
        </p>

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
      <h3 className="mt-8 mb-4 font-semibold text-xl">
        Comments
      </h3>

      {comments.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          refreshComments={fetchComments}
        />
      ))}

      {/* Add Comment */}
      <div className="flex flex-col md:flex-row w-full mt-6">

        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment"
          className="md:w-[80%] border px-4 py-2 outline-none"
        />

        <button
          onClick={handleAddComment}
          className="bg-black text-white md:w-[20%] px-4 py-2"
        >
          Add Comment
        </button>

      </div>

    </div>
  );
}

export default PostDetails;