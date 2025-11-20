import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <div className="flex justify-between  p-5 tracking-wide decoration-double shadow-md ">
      <Link
        to="/"
        className="hover:underline text-2xl  font-bold decoration-yellow-500"
      >
        AI Blog Generator
      </Link>
      <div className="decoration-yellow-500 decoration-double text-lg mt-1 flex gap-5">
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
            <p className="hover:underline cursor-pointer">Logout</p>
          </>
        )}
      </div>
    </div>
  );
}
