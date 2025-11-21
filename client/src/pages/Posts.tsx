import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

type PostData = {
  _id: string;
  title: string;
  createdAt: string;
};

export default function Posts() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPosts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/posts");
      setPosts(res.data.posts);
    } catch (err: any) {
      setError(err.response?.data?.msg || "Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-3">Posts</h1>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && posts.length === 0 && (
        <p className="text-gray-500">You haven't created any posts yet.</p>
      )}

      {posts.map((p) => (
        <div
          key={p._id}
          className="bg-white p-4 my-3 rounded-md shadow-sm border border-gray-100"
        >
          <Link
            to={`/posts/${p._id}`}
            className="text-xl font-bold mb-2 hover:underline cursor-pointer"
          >
            {p.title}
          </Link>

          <p className="text-sm text-gray-600 mt-1">
            Created on: {new Date(p.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
