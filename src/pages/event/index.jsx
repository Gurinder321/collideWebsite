"use client";

import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
const events = [
  {
    date: "August 3ʳᵈ (pre pub), 7pm",
    title: "The Ripped Bodice",
    location: "Brooklyn, NY",
    titleimg: "/embracetitle.png",
    link: "https://e.sparxo.com/Bal-Khabra-Embrace-BK-Ticketed",
  },
  {
    date: "August 4ᵗʰ, 7pm",
    title: "The Last Chapter",
    location: "Chicago, IL",
    titleimg: "/embracetitle.png",
    link: "https://beventi.co/tickets/hiaqjky3yq",
  },
  {
    date: "August 5ᵗʰ, 7pm",
    title: "The Novel Neighbor",
    location: "St. Louis, MO",
    titleimg: "/embracetitle.png",
    link: "https://thenovelneighbor.com/balkhabra",
  },
  {
    date: "August 6ᵗʰ, 7pm",
    title: "Half Price Books",
    location: "Dallas, TX",
    titleimg: "/embracetitle.png",
    link: "https://www.eventbrite.com/e/talk-and-book-signing-with-bestselling-author-bal-khabra-tickets-1983391603678?aff=oddtdtcreator",
  },
  {
    date: "August 7ᵗʰ, 7pm",
    title: "Meet Cute Books",
    location: "La Mesa, CA",
    titleimg: "/embracetitle.png",
    link: "https://meetcutebookshop.com/events/5137120260807",
  },
  {
    date: "August 8ᵗʰ, 3pm",
    title: "Barnes & Noble",
    location: "Huntington Beach, CA",
    titleimg: "/embracetitle.png",
    link: "https://www.eventbrite.com/e/bal-khabra-celebrates-embrace-at-barnes-noble-huntington-beach-tickets-1988873003693?aff=oddtdtcreator",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function EventsPage() {
  return (
    <Layout>
      <div className="bg-pink-50 p-4 sm:p-6 pt-24 pb-12 overflow-y-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-adobejenson  text-[#f095d8]">
            Let’s Hang Out!
          </h1>
        </div>

        <div className="relative max-w-2xl mx-auto mt-8">
          {/* Vertical Line */}
          <div className="block absolute left-1/2 top-0 h-full w-[2px]  sm:w-1 bg-gray-300 transform -translate-x-1/2 z-0" />

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="relative z-10"
          >
            {events.map((event, index) => {
              const isLeft = index % 2 !== 0; // middle one on the left
              return (
                <motion.div
                  key={index}
                  variants={item}
                  className={`w-1/2 sm:px-6 flex flex-col gap-0 justify-center items-center mt-0  rounded relative ${
                    isLeft ? "ml-0 mr-auto pr-4" : "mr-0 ml-auto pl-4"
                  }`}
                >
                  {/* Dot on timeline */}
                  <FaHeart
                    className={`absolute  top-1/2 w-4 h-4 sm:w-6 sm:h-6  text-[#f095d8] transform -translate-y-1/2 z-10
                     ${isLeft ? "-right-2 sm:-right-3" : "-left-2 sm:-left-3"}
                    `}
                  />

                  <div className="w-full max-w-18 sm:max-w-24 aspect-[1/0.4] relative left-0 mb-8">
                    <Image
                      src={event.titleimg}
                      alt={event.title}
                      width={300}
                      height={150}
                      className="flex justify-start"
                    />
                  </div>
                  <div className="font-kievitSerifBold text-gray-800 font-semibold text-base sm:text-lg uppercase">
                    {event.date}
                  </div>
                  <div className="mt-1  leading-none text-sm sm:text-lg flex flex-col items-center   text-gray-600">
                    <span className="font-medium  font-kievitSerif ">{event.title}</span>
                    <span className=" font-kievitSerif "> {event.location}</span>
                  </div>

                 <Link href={event.link}>
                   <button class="group mt-2 sm:mt-3 text-xs sm:text-sm relative bg-[#f095d8] h-6 sm:h-8  hover:text-[#f095d8] hover:bg-white inline-flex  px-3 py-2 sm:px-4 sm:py-2  items-center justify-center overflow-hidden rounded-lg border border-neutral-200   font-medium text-neutral-600 transition-all [box-shadow:0px_2px_1px_#a3a3a3] active:translate-y-[2px] active:shadow-none">
                     GET TICKETS
                   </button></Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
