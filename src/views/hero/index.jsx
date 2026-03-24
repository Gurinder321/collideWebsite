
import { booksdata } from '@/json/bookdata';
import BookCarousel from '../../components/Carousal/FirstCarousel';
import { Amazon, Target, Barnenobles, Booksmellion, Walmart } from '../../svg/logo';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 18 },
  },
};

const Hero = () => {
  const icons = [Amazon, Target, Barnenobles, Booksmellion, Walmart];

  return (
    <section id='#hero' className="flex flex-col justify-center relative items-center pt-40 sm:pt-36 md:pt-40 overflow-x-hidden">
      {/* Background Overlay */}
      <div className="bg-[#1f1e2c] w-full h-1/2 absolute bottom-0" />

      {/* Heading Section */}
      <motion.div
        className="text-center mb-10 sm:mb-12 md:mb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-[30px] sm:text-[40px] md:text-[63px] mt-4 font-stix italic"
          variants={itemVariants}
        >
          Off The Ice
        </motion.h2>
        <motion.p
          className="text-[40px] sm:text-[60px] md:text-[80px] font-stix font-normal leading-8"
          variants={itemVariants}
        >
          Latest Releases
        </motion.p>
      </motion.div>

      <BookCarousel data={booksdata} className="w-full" />

      {/* Available on Section */}
      <motion.div
        className="my-12 sm:my-16 md:my-20 w-full h-auto text-center flex flex-col items-center justify-center text-white z-[1] px-6"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7, ease: 'easeOut' }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal font-stix tracking-normal mb-4">
          <span className="font-stix italic font-light">Books</span> are available on
        </h2>

        <motion.div
          className="grid grid-cols-6 grid-rows-2 gap-4 mt-6 sm:mt-8 sm:flex sm:justify-between sm:w-3/4 items-center mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { el: <Amazon />, cls: "flex col-span-2 col-start-2 col-end-4 justify-center w-full sm:w-24 md:w-36 p-1 cursor-pointer" },
            { el: <Barnenobles />, cls: "flex col-span-2 col-start-4 col-end-6 justify-center w-full sm:w-24 md:w-36 cursor-pointer" },
            { el: <Target />, cls: "flex col-span-2 row-start-2 justify-center w-[80%] sm:w-24 md:w-32 cursor-pointer" },
            { el: <Walmart />, cls: "flex col-span-2 row-start-2 justify-center w-full sm:w-24 md:w-36 cursor-pointer" },
            { el: <Booksmellion />, cls: "flex col-span-2 row-start-2 justify-center w-full sm:w-52 cursor-pointer" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className={item.cls}
              variants={itemVariants}
              whileHover={{ scale: 1.08, opacity: 0.85 }}
              whileTap={{ scale: 0.97 }}
            >
              {item.el}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
