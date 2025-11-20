import React from "react";

export default function Hero() {
  return (
    <div className=" max-w-3xl mx-auto">
      <h1 className="font-bold text-xl mt-6 mb-4  text-center">
        Welcome to Youtube To Blog Post Generator!
      </h1>
      <p className=" text-center mb-3">
        Generate high-quality blog articles from Youtube videos using Artificial
        Intelligence. Simply enter the link to the youtube video and let the AI
        create the content for you!
      </p>

      <h1 className="text-xl font-bold">Enter Youtube Video Link</h1>
      <input
        type="text"
        placeholder="Ex: https://youtu.be/dQw4w9WgXcQ?si=FMM8UVtTTbG5kM94"
        className="w-4/5 shadow-md border-gray-400 border-2 p-2 rounded-md mt-3"
      />
      <button className="bg-yellow-400 p-2 px-3 rounded-md ml-4 cursor-pointer">
        Generate
      </button>

      <div className="mt-5">
        <h1 className="text-xl font-bold">Generated Blog Article</h1>
        <div className="bg-white h-[20vh] mt-3"></div>
      </div>
    </div>
  );
}
