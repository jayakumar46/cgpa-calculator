import { ArrowBigRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import bgImg from "../assets/bg-1.jpg";

const Home = () => {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${bgImg})` }}
        className="flex justify-center items-center w-full min-h-screen bg-no-repeat bg-cover bg-center hero"
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Card content */}
        <div className="relative p-6 sm:p-10 w-[90%] max-w-md bg-white/20 backdrop-blur-md rounded-2xl shadow-lg text-center">
          <h1 className="text-xl sm:text-3xl font-bold text-white drop-shadow-md">
            Hii Guys 👋
          </h1>
          <p className="mt-2 text-sm sm:text-lg text-gray-200">
            Calculate your SGPA & CGPA instantly 🚀
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-4 mt-8">
            <Link
              to="/sgpa-calculator"
              className="flex items-center justify-center gap-2 font-semibold bg-green-500 hover:bg-green-600 transition-all px-6 py-3 rounded-lg text-white shadow-md"
            >
              SGPA <ArrowBigRight />
            </Link>

            <Link
              to="/cgpa-calculator"
              className="flex items-center justify-center gap-2 font-semibold bg-blue-500 hover:bg-blue-600 transition-all px-6 py-3 rounded-lg text-white shadow-md"
            >
              CGPA <ArrowBigRight />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
