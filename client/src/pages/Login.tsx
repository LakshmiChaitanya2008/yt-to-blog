import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      return setError("Email and password are required.");
    }

    try {
      setLoading(true);
      setError("");

      const res = await api.post("/auth/login", data);
      login(res.data.token);

      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-5 bg-white rounded-xl shadow">
      <h1 className="font-bold text-3xl mb-6 text-center">Login</h1>

      {error && (
        <div className="mb-4 bg-red-100 text-red-700 p-2 rounded-md text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-yellow-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-yellow-300"
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-yellow-400 hover:bg-yellow-500 transition p-2 text-black font-semibold rounded-md disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-center text-sm mt-4">
        Don’t have an account?{" "}
        <Link to="/register" className="text-yellow-600 font-semibold">
          Register here
        </Link>
      </p>
    </div>
  );
}
