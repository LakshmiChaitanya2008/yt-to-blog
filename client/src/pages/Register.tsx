import React from "react";

export default function Register() {
  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="font-bold text-2xl mb-4">Register</h1>
      <form>
        <input
          type="name"
          placeholder="Enter name"
          className="w-full border border-gray-200 bg-white  p-2 rounded-md mt-1"
        />
        <input
          type="email"
          placeholder="Enter email"
          className="w-full border border-gray-200 bg-white  p-2 rounded-md mt-1"
        />
        <input
          type="password"
          placeholder="Enter Password"
          className="w-full border border-gray-200 bg-white  p-2 rounded-md mt-3"
        />

        <button className="block px-4 py-2 rounded-md mt-2 bg-yellow-400 cursor-pointer">
          Submit
        </button>
      </form>
    </div>
  );
}
