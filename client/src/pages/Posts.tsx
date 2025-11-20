import { Link } from "react-router-dom";

export default function Posts() {
  return (
    <div className="max-w-2xl mx-auto mt-6">
      <h1 className=" text-2xl font-bold mb-3">Posts</h1>
      {new Array(10).fill(0).map(() => (
        <div className="bg-white p-4 my-3 rounded-md">
          <Link
            to="/posts/1"
            className="text-xl font-bold mb-3 hover:underline cursor-pointer"
          >
            Never Gonna Give You Up
          </Link>
          <p>Created On: 24/03/2026</p>
        </div>
      ))}
    </div>
  );
}
