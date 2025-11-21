import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type PostData = {
  _id: string;
  title: string;
  content: string;
  link: string;
  createdAt: string;
};

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getPost = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/posts/${id}`);
      setPost(res.data.post);
    } catch (err: any) {
      setError(err.response?.data?.msg || "Failed to load post");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPost();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto mt-6 bg-white p-6 shadow rounded-lg">
      <Link
        to="/posts"
        className="text-sm text-blue-600 hover:underline cursor-pointer"
      >
        {"<-"} Back to Posts
      </Link>

      {loading && <p className="mt-4 text-gray-600">Loading post...</p>}

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {post && (
        <>
          <h1 className="text-3xl font-bold mt-3">{post.title}</h1>
          <p className="text-gray-500 text-sm mt-1">
            Created on {new Date(post.createdAt).toLocaleString()}
          </p>

          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-3 text-blue-500 underline"
          >
            Original Video
          </a>

          <div className="mt-6 whitespace-pre-wrap leading-relaxed prose prose-lg max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </>
      )}
    </div>
  );
}
