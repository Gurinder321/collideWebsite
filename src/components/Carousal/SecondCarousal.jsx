import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineArrowNarrowRight, HiOutlineArrowNarrowLeft } from 'react-icons/hi';
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

const darkenColor = (color, percent) => {
  const num = parseInt(color.replace('#', ''), 16);
  const r = Math.round((num >> 16) * (1 - percent));
  const g = Math.round(((num >> 8) & 0x00ff) * (1 - percent));
  const b = Math.round((num & 0x0000ff) * (1 - percent));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
  center: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 90, damping: 20 },
  },
  exit: (dir) => ({
    opacity: 0,
    x: dir > 0 ? -80 : 80,
    transition: { duration: 0.22, ease: 'easeIn' },
  }),
};

const contentStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};

const contentItem = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 18 } },
};

const SecondCarousel = ({ data }) => {
  const filteredData = data.filter(
    (book) => typeof book.description === 'string' && book.description.trim() !== ''
  );
  const { openModal } = useModal();
  const handleOpenModal = (warnings) => openModal(<ContentWarning data={warnings} />);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const bgColor = filteredData[currentSlideIndex]?.bgColor || '#6e9277';
  const lightColor = lightenColor(bgColor, 0.55);
  const darkColor = darkenColor(bgColor, 0.25);
  const total = filteredData.length;

  const goNext = () => {
    setDirection(1);
    setCurrentSlideIndex((i) => (i + 1) % total);
  };
  const goPrev = () => {
    setDirection(-1);
    setCurrentSlideIndex((i) => (i - 1 + total) % total);
  };

  const seriesNum = String(currentSlideIndex + 1).padStart(2, '0');

  return (
    <motion.section
      id="books"
      className="relative w-full flex items-center justify-center overflow-hidden"
      animate={{ backgroundColor: bgColor }}
      transition={{ duration: 0.55, ease: 'easeInOut' }}
      style={{ minHeight: 640 }}
    >
      {/* Radial gradient depth layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ background: `radial-gradient(ellipse at 70% 50%, ${darkColor}88 0%, transparent 70%)` }}
        transition={{ duration: 0.55 }}
      />

      {/* Giant decorative series number */}
      <motion.div
        key={seriesNum}
        className="absolute right-0 bottom-0 select-none pointer-events-none leading-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.07 }}
        transition={{ duration: 0.4 }}
        style={{
          fontSize: 'clamp(180px, 28vw, 380px)',
          fontFamily: 'var(--font-stix)',
          fontWeight: 700,
          color: '#ffffff',
          lineHeight: 0.85,
        }}
      >
        {seriesNum}
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12 sm:py-16">
        {/* Top bar: series label + counter + nav */}
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <motion.p
            className="text-white/70 font-poppins text-xs tracking-[0.25em] uppercase"
            animate={{ opacity: 1 }}
            key={currentSlideIndex}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            Off The Ice Series
          </motion.p>

          {/* Navigation + counter */}
          <div className="flex items-center gap-4">
            <motion.button
              onClick={goPrev}
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors duration-200"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
            >
              <HiOutlineArrowNarrowLeft className="text-lg" />
            </motion.button>

            <span className="font-poppins text-white/80 text-sm tabular-nums">
              <span className="text-white font-semibold">{String(currentSlideIndex + 1).padStart(2, '0')}</span>
              <span className="mx-1 text-white/40">/</span>
              <span>{String(total).padStart(2, '0')}</span>
            </span>

            <motion.button
              onClick={goNext}
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors duration-200"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
            >
              <HiOutlineArrowNarrowRight className="text-lg" />
            </motion.button>
          </div>
        </div>

        {/* Slide content */}
        <AnimatePresence mode="wait" custom={direction}>
          {filteredData.map((book, index) =>
            index === currentSlideIndex ? (
              <motion.div
                key={book.id + index}
                className="flex flex-col-reverse sm:flex-row items-center gap-8 sm:gap-12"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {/* Left: text */}
                <motion.div
                  className="w-full sm:w-1/2 lg:w-[55%] flex flex-col gap-5"
                  variants={contentStagger}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Eyebrow */}
                  <motion.div variants={contentItem} className="flex items-center gap-3">
                    <span className="h-[1px] w-8 bg-white/50" />
                    <span className="text-white/70 font-poppins text-xs tracking-[0.2em] uppercase">
                      {book.subtitle}
                    </span>
                  </motion.div>

                  {/* Title image */}
                  <motion.div
                    variants={contentItem}
                    className="h-14 sm:h-16 md:h-20 w-auto relative"
                    style={{ maxWidth: 320 }}
                  >
                    <Image
                      src={book.titleimg}
                      alt={book.title}
                      width={320}
                      height={80}
                      className="object-contain object-left h-full w-auto"
                    />
                  </motion.div>

                  {/* Character names */}
                  <motion.p
                    variants={contentItem}
                    className="font-puppies text-2xl sm:text-3xl font-black"
                    style={{ color: lightColor }}
                  >
                    {book.character}
                  </motion.p>

                  {/* Description */}
                  <motion.div
                    variants={contentItem}
                    dangerouslySetInnerHTML={{ __html: book.description }}
                    className="text-white/85 font-montserrat text-sm sm:text-base leading-relaxed flex flex-col gap-3 line-clamp-5 sm:line-clamp-none"
                  />

                  {/* Actions */}
                  <motion.div variants={contentItem} className="flex flex-wrap items-center gap-3 pt-2">
                    <Link href={book.read} target="_blank" rel="noopener noreferrer">
                      <motion.button
                        className="px-5 py-2.5 rounded-full text-sm font-poppins font-semibold border-2 transition-all duration-200"
                        style={{ borderColor: lightColor, color: darkColor, backgroundColor: lightColor }}
                        whileHover={{ scale: 1.04, opacity: 0.88 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        Read Now
                      </motion.button>
                    </Link>

                    {book.goodreads && (
                      <Link href={book.goodreads} target="_blank" rel="noopener noreferrer">
                        <motion.button
                          className="px-5 py-2.5 rounded-full text-sm font-poppins font-semibold border-2 text-white transition-all duration-200"
                          style={{ borderColor: 'rgba(255,255,255,0.5)' }}
                          whileHover={{ backgroundColor: 'rgba(255,255,255,0.12)', scale: 1.04 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          Goodreads
                        </motion.button>
                      </Link>
                    )}

                    <button
                      onClick={() => handleOpenModal(book?.contentwarings)}
                      className="text-white/60 text-xs font-poppins underline underline-offset-2 hover:text-white/90 transition-colors"
                    >
                      Content Warning
                    </button>
                  </motion.div>
                </motion.div>

                {/* Right: book cover */}
                <div className="w-full sm:w-1/2 lg:w-[45%] flex justify-center sm:justify-end items-center relative">
                  <motion.div
                    className="relative"
                    initial={{ scale: 0.92, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.1 }}
                  >
                    {/* Glow behind cover */}
                    <div
                      className="absolute inset-0 rounded-xl blur-2xl opacity-40 scale-90"
                      style={{ backgroundColor: lightColor }}
                    />

                    {/* Main book cover */}
                    <div className="relative w-[200px] sm:w-[240px] md:w-[280px] aspect-[1/1.4] z-10">
                      <Image
                        src={book.bookcover}
                        alt={book.title}
                        fill
                        className="object-contain drop-shadow-2xl"
                      />
                    </div>

                    {/* Tablet/ebook mockup */}
                    <div
                      className="absolute bottom-[-1rem] left-[-5rem] sm:left-[-6rem] w-[130px] sm:w-[150px] aspect-[1/1.2] z-20"
                    >
                      <Image src={book.imgSrc} alt={book.title} fill className="object-contain rounded-lg p-1" />
                      <Image src="/tablet.png" alt="tablet" fill className="object-contain rounded-lg" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>

        {/* Progress dots */}
        <div className="flex gap-2 mt-10 sm:mt-12">
          {filteredData.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => { setDirection(i > currentSlideIndex ? 1 : -1); setCurrentSlideIndex(i); }}
              className="h-[3px] rounded-full transition-all duration-300"
              animate={{
                width: i === currentSlideIndex ? 28 : 12,
                backgroundColor: i === currentSlideIndex ? '#ffffff' : 'rgba(255,255,255,0.3)',
              }}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.7)' }}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default SecondCarousel;
