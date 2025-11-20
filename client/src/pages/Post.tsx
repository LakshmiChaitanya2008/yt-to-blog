import React from "react";
import { Link } from "react-router-dom";

export default function Post() {
  return (
    <div className="max-w-4xl mx-auto mt-6 bg-white p-4">
      <Link to="/posts" className="hover:underline cursor-pointer">
        {"<-"} Back
      </Link>
      <h1 className="text-2xl mt-1 font-bold">Never Gonna Give You Up</h1>
    </div>
  );
}
