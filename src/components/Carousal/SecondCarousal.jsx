import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import Image from 'next/image';
import Link from 'next/link';
import ContentWarning from '../contentwarning';
import { useModal } from '@/context/modalContext';

const lightenColor = (color, percent) => {
  const num = parseInt(color.replace('#', ''), 16);
  const r = (num >> 16) + Math.round((255 - (num >> 16)) * percent);
  const g = ((num >> 8) & 0x00ff) + Math.round((255 - ((num >> 8) & 0x00ff)) * percent);
  const b = (num & 0x0000ff) + Math.round((255 - (num & 0x0000ff)) * percent);
  return `#${(r < 255 ? r : 255).toString(16).padStart(2, '0')}${(g < 255 ? g : 255).toString(16).padStart(2, '0')}${(b < 255 ? b : 255).toString(16).padStart(2, '0')}`;
};

const slideVariants = {
  enter: { opacity: 0, x: 60 },
  center: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20 },
  },
  exit: {
    opacity: 0,
    x: -60,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
};

const contentVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const contentItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 18 } },
};

const SecondCarousel = ({ data }) => {
  const filteredData = data.filter(
    (book) => typeof book.description === 'string' && book.description.trim() !== ''
  );
  const { openModal } = useModal();

  const handleOpenModal = (data) => openModal(<ContentWarning data={data} />);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const backgroundColor = filteredData[currentSlideIndex]?.bgColor || '';
  const lightColor = lightenColor(backgroundColor, 0.5);

  const handleNext = () => {
    setCurrentSlideIndex((currentSlideIndex + 1) % filteredData.length);
  };

  return (
    <motion.section
      id="#books"
      className="relative w-full sm:h-screen flex items-center justify-center mx-auto py-8 sm:py-12 px-6"
      animate={{ backgroundColor }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      style={{ minHeight: 600 }}
    >
      <div className="carousel w-full flex justify-center items-center relative">
        <AnimatePresence mode="wait">
          {filteredData.map((book, index) =>
            index === currentSlideIndex ? (
              <motion.div
                key={book.id + index}
                className="w-full flex flex-col items-center text-center sm:text-left sm:flex-row"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <div className="flex flex-col-reverse sm:flex-row items-center w-full">
                  {/* Left: text content */}
                  <motion.div
                    className="w-full lg:w-1/2 h-full flex flex-col text-left space-y-4 md:space-y-10 lg:p-8 py-6"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.p
                      className="text-sm text-white font-semibold font-poppins leading-relaxed tracking-wide"
                      variants={contentItem}
                    >
                      {book.subtitle}
                    </motion.p>

                    <motion.div
                      className="h-16 aspect-[1/0.5] relative w-auto left-0 my-6"
                      variants={contentItem}
                    >
                      <Image src={book.titleimg} alt={book.title} width={300} height={150} className="flex justify-start" />
                    </motion.div>

                    <motion.div
                      dangerouslySetInnerHTML={{ __html: book.description }}
                      className="text-sm sm:text-base lg:text-lg text-balance my-6 text-white font-montserrat font-normal leading-relaxed flex flex-col gap-4"
                      variants={contentItem}
                    />

                    <motion.div variants={contentItem}>
                      <h4 className="text-sm flex items-end gap-2 mt-4">
                        <span
                          className="text-white font-bold text-base cursor-pointer decoration-solid underline decoration-white hover:opacity-75 transition-opacity"
                          onClick={() => handleOpenModal(book?.contentwarings)}
                        >
                          Content Warning!
                        </span>
                      </h4>

                      <div className="flex space-x-4 mt-4">
                        <Link href={book.read}>
                          <motion.button
                            style={{ backgroundColor: lightColor }}
                            className="max-sm:text-base text-gray-800 font-poppins font-normal py-2 px-4 sm:px-6 rounded-md shadow transition duration-300 ease-in-out"
                            whileHover={{ opacity: 0.8, scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            READ NOW
                          </motion.button>
                        </Link>
                        {book.goodreads && (
                          <Link href={book.goodreads}>
                            <motion.button
                              style={{ backgroundColor: lightColor }}
                              className="max-sm:text-base text-gray-800 font-normal font-poppins py-2 px-4 sm:px-6 rounded-md shadow transition duration-300 ease-in-out"
                              whileHover={{ opacity: 0.8, scale: 1.02 }}
                              whileTap={{ scale: 0.97 }}
                            >
                              ADD TO GOODREADS
                            </motion.button>
                          </Link>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Right: book image */}
                  <div className="w-full lg:w-1/2 flex justify-end items-center relative p-2">
                    <h1
                      className="font-puppies absolute left-[-0.5rem] sm:left-0 top-[22%] sm:top-1/4 translate-y-1/4 text-3xl sm:text-2xl md:text-2xl lg:text-4xl font-black transition-all duration-500"
                      style={{ color: lightColor }}
                    >
                      {book.character}
                    </h1>

                    <motion.div
                      className="w-[70%] md:w-[70%] aspect-[1/1.3] flex justify-end left-6 items-center relative"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 90, damping: 18, delay: 0.15 }}
                    >
                      <Image src={book.bookcover} alt={book.title} layout="fill" objectFit="cover" />
                      <div className="w-2/3 absolute bottom-2 left-[-5rem] sm:left-[-4rem] md:left-[-8rem] aspect-[1/1.2] flex justify-end items-center">
                        <Image src={book.imgSrc} alt={book.title} layout="fill" objectFit="contain" className="rounded-lg p-1" />
                        <Image src="/tablet.png" alt="tablet" layout="fill" objectFit="contain" className="rounded-lg" />
                      </div>
                    </motion.div>

                    <motion.button
                      onClick={handleNext}
                      className="carousel-control absolute right-[-1rem] p-1"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.92 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <HiOutlineArrowNarrowRight className="text-white font-bold text-xl sm:text-3xl" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default SecondCarousel;
