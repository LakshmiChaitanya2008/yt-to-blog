import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);
  console.log(token);
  const isLoggedIn = Boolean(token);

  return (
    <div className="flex justify-between p-5 tracking-wide shadow-md bg-white">
      <Link
        to="/"
        className="hover:underline text-2xl font-bold decoration-yellow-500"
      >
        AI Blog Generator
      </Link>

      <div className="text-lg mt-1 flex gap-5 decoration-yellow-500">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/posts" className="hover:underline">
              Your Posts
            </Link>

            <button
              onClick={logout}
              className="hover:underline cursor-pointer bg-transparent border-none text-left"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
