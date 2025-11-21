import React, { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Hero() {
  const [url, setUrl] = useState("");
  const [blog, setBlog] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!token) {
    navigate("/login");
  }

  const handleGenerate = async () => {
    if (!url.trim()) {
      setError("Please enter a valid YouTube URL.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setBlog("");

      const res = await api.post("/posts/create", { youtubeUrl: url });
      setBlog(res.data.blog);
    } catch (err: any) {
      setError(err.response?.data?.msg || "Failed to generate blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-bold text-xl mt-6 mb-4 text-center">
        Welcome to Youtube to Blog Generator!
      </h1>

      <p className="text-center mb-4 text-gray-700">
        Convert any YouTube video into a high-quality blog article using AI.
        Paste the video link and let magic happen!
      </p>

      <h2 className="text-xl font-semibold mb-1">Enter YouTube Video Link</h2>

      <div className="flex items-center">
        <input
          type="text"
          placeholder="Ex: https://youtu.be/dQw4w9WgXcQ"
          className="w-4/5 shadow-md border-gray-400 border p-2 rounded-md mt-3"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          className="bg-yellow-400 p-2 px-4 rounded-md ml-4 mt-3 disabled:opacity-50"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      {error && (
        <div className="mt-3 text-red-500 font-medium bg-red-100 p-2 rounded-md">
          {error}
        </div>
      )}

      {loading && (
        <p className="mt-4 text-center text-gray-600">Please wait...</p>
      )}

      {blog && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">Generated Blog Article</h2>

          <div className="mt-6 whitespace-pre-wrap leading-relaxed prose prose-lg max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
