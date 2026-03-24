import Image from "next/image";
import Link from "next/link";
import React from "react";
import { WiStars } from "react-icons/wi";
import Navbar from "../Navbar";
const ComingSoon = ({ content }) => {
  return (
    <div className="w-full h-screen relative bg-[#F8F3EC] flex flex-col items-center">
    <div className="bg-[#1f1e2c]  w-full h-2/5 absolute bottom-0 z-0" />
      <Navbar variants="other" />
  
      <div className="w-full h-full flex items-center justify-center ">
      <div className="bg-white z-10 shadow-xl flex flex-col items-center justify-evenly rounded w-[80%]  max-w-2xl h-80 p-6 md:p-8 space-y-6">
          <h2 className="animate-charcter text-3xl md:text-5xl  font-bold text-gray-800 text-center">
            {content} Content
          </h2>
          <hr className="border-gray-300 w-[80%]" />
          <p className="text-lg  text-gray-500 text-center">
            “Your Valentine’s Bonus is Ready”
          </p>
          <a
            href="/valentine-bonus.pdf"
            download
            className="z-10 text-pink font-semibold text-2xl group underline hover:text-fuchsia-600 transition"
          >
            <span className="text-fuchsia-600 group-hover:text-pink ">OTI</span> Valentine’s Day Bonus
          </a>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
