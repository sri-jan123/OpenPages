import React, { useState, useContext } from "react";
import axios from "axios";
import { URL as API_URL } from "../url";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { loading } = useContext(UserContext);
  const navigate = useNavigate();

  const addCategory = () => {
    const trimmed = cat.trim();

    if (!trimmed) return;

    const exists = cats.some(
      (c) => c.toLowerCase() === trimmed.toLowerCase()
    );

    if (exists) {
      setCat("");
      return;
    }

    setCats((prev) => [...prev, trimmed]);
    setCat("");
  };

  const deleteCategory = (index) => {
    setCats(cats.filter((_, i) => i !== index));
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setIsSubmitting(true);

      // auto-add current category if user forgot to press Add
      let updatedCats = [...cats];

      if (cat.trim()) {
        const exists = updatedCats.some(
          (c) => c.toLowerCase() === cat.trim().toLowerCase()
        );

        if (!exists) {
          updatedCats.push(cat.trim());
        }
      }

      const formData = new FormData();

      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("categories", JSON.stringify(updatedCats));

      if (file) {
        formData.append("image", file);
      }

      const res = await axios.post(
        `${API_URL}/api/posts/create`,
        formData,
        {
          withCredentials: true,
        }
      );

      navigate(`/posts/post/${res.data._id}`);
    } catch (err) {
      console.log(err);

      setError(
        err?.response?.data?.message ||
          "Failed to create post. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <p className="px-6 md:px-[200px] mt-8">
        Loading...
      </p>
    );
  }

  return (
    <div className="px-6 md:px-[200px] mt-8">
      <h1 className="font-bold text-xl md:text-2xl mt-8">
        Create a Post
      </h1>

      <form
        onSubmit={handleCreatePost}
        className="flex flex-col space-y-8 mt-4"
      >
        {/* Title */}
        <input
          type="text"
          placeholder="Enter post title"
          className="px-4 py-2 border outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Image */}
        <input
          type="file"
          accept="image/*"
          className="px-4"
          onChange={(e) => setFile(e.target.files[0])}
        />

        {/* Preview */}
        {file && (
          <img
            src={URL.createObjectURL(file)}
            alt="preview"
            className="w-[300px] rounded-lg"
          />
        )}

        {/* Categories */}
        <div>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Enter category"
              className="px-4 py-2 border outline-none"
              value={cat}
              onChange={(e) => setCat(e.target.value)}
            />

            <button
              type="button"
              onClick={addCategory}
              className="bg-black text-white px-4 py-2"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            {cats.map((c, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded"
              >
                <span>{c}</span>

                <button
                  type="button"
                  className="bg-red-600 text-white px-2 rounded-full"
                  onClick={() => deleteCategory(i)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <textarea
          rows={15}
          placeholder="Enter post description"
          className="px-4 py-2 border outline-none"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />

        {/* Error */}
        {error && (
          <p className="text-red-600 text-sm">
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black text-white px-4 py-2 w-full md:w-[200px] mx-auto disabled:opacity-50"
        >
          {isSubmitting ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;