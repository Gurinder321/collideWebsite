import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.25 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 70, damping: 16 },
  },
};

const FirstCarousel = ({ data }) => {
  return (
    <div className="w-full flex justify-center">
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 md:gap-4 p-4 pb-8 w-full max-w-[1100px]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {data.map((book, index) => (
          <motion.div
            key={index}
            className="flex flex-col text-left items-start"
            variants={cardVariants}
            whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
          >
            <h1
              className={`mb-2 ${(index === 2 || index === 3) ? 'text-white md:text-black' : 'text-black'} text-[10px] z-10 sm:text-sm font-medium`}
            >
              {book.isavailable}
            </h1>

            {/* Book cover — links to Amazon */}
            <Link
              href={book.amazonUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full aspect-[1/1.2] block"
            >
              <Image
                src={book.bookcover}
                alt={book.title}
                fill
                style={{ objectFit: 'contain' }}
                className="transition-opacity duration-300 group-hover:opacity-80"
              />
              <div className="absolute left-[42%] top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-[#FF9900] text-white text-[10px] sm:text-xs font-poppins font-semibold px-3 py-1 rounded-full shadow-lg whitespace-nowrap">
                  Buy on Amazon
                </span>
              </div>
            </Link>

            <h3
              className={`text-xs z-10 sm:text-xl mt-2 sm:mt-5 font-semibold font-markazitext mb-2 ${(index === 0 || index === 1) ? 'text-black md:text-white' : 'text-white'}`}
            >
              {book.title}
            </h3>
            <p
              className={`text-xs z-10 sm:text-base font-alkatra font-medium ${(index === 0 || index === 1) ? 'text-black md:text-white' : 'text-white'}`}
            >
              {book.releaseDate}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FirstCarousel;
