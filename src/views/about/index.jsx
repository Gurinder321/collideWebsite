
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 70, damping: 18 } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 70, damping: 18, delay: 0.1 } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 70, damping: 18, delay: 0.2 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id='about' className="flex flex-col justify-center items-center">
      <div className='flex flex-col justify-center items-center overflow-hidden' ref={ref}>
        <div className="w-full h-full flex flex-col-reverse sm:flex-row items-center mt-12 sm:mt-14 md:mt-16">

          {/* Text Content */}
          <motion.div
            className="w-full md:w-1/2 h-full flex flex-col justify-center items-start p-6 py-8 sm:p-4 md:p-6 lg:p-16"
            variants={stagger}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.h2
              className="text-3xl flex h-auto sm:text-3xl relative md:text-4xl lg:text-6xl mb-8 font-metal font-thin text-[#d178b0]"
              variants={fadeLeft}
            >
              About the author
              <div className='w-24 sm:w-28 md:w-36 lg:w-48 aspect-square absolute top-[-2rem] right-[-6rem] sm:top-[-2rem] sm:right-[-8rem] md:top-[-4rem] md:right-[-12rem]'>
                <Image src='/send.svg' alt="send image" layout='fill' objectFit="contain" />
              </div>
            </motion.h2>

            <motion.p
              className="w-full text-base sm:text-sm md:text-lg text-justify sm:text-left lg:text-2xl font-montserrat font-normal leading-relaxed mb-4"
              variants={fadeUp}
            >
              Hi there! I&apos;m Bal, your resident book lover and professional daydreamer.
            </motion.p>

            <motion.p
              className="w-full text-base sm:text-sm md:text-lg text-justify sm:text-left lg:text-2xl font-montserrat font-normal leading-relaxed mb-4"
              variants={fadeUp}
            >
              When I&apos;m not glued to my keyboard, juggling thirty different novel ideas, or using banter to convince my characters that they&apos;re perfect for each other, you can catch me dragging unsuspecting souls into the Great Canadian Outdoors for some fresh air (and a little inspiration).
            </motion.p>

            <motion.p
              className="w-full text-base sm:text-sm md:text-lg text-justify sm:text-left lg:text-2xl font-montserrat font-normal leading-relaxed mb-4"
              variants={fadeUp}
            >
              When I do write, I love to blend all my favourite things: sports, banter, diversity, and fluff! So, if that sounds like your cup of chai, stick around, and we&apos;ll embark on this literary journey together!
            </motion.p>
          </motion.div>

          {/* Image Content */}
          <motion.div
            className="w-full md:w-1/2 p-10 md:p-6 lg:p-16 aspect-square"
            variants={fadeRight}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.div
              className="relative w-full h-full rounded-full bg-[#f6c3c8] border-2"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image
                src="/girl.png"
                alt="girl"
                layout="fill"
                objectFit="cover"
                className="shadow-default rounded-full border-2 border-black w-11/12"
              />
            </motion.div>
          </motion.div>

        </div>

        <div className="w-full hidden relative sm:flex bg-gray-300 h-[1px] justify-center items-center mt-12 md:mt-6 mb-12 sm:mb-16 md:mb-20">
          <hr className="w-full max-w-[25%] h-1 absolute bg-black left-[63%]" />
        </div>
      </div>
    </section>
  );
};

export default About;
