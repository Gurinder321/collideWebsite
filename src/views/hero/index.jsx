
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

const retailers = [
  {
    el: <Amazon />,
    href: 'https://www.amazon.com/stores/Bal-Khabra/author/B0B98R4XCD',
    cls: 'flex col-span-2 col-start-2 col-end-4 justify-center w-full sm:w-24 md:w-36 p-1',
  },
  {
    el: <Barnenobles />,
    href: 'https://www.barnesandnoble.com/s/%22Bal%20Khabra%22;jsessionid=595A3B5EDDD26F5515823528CCF86A4F.prodny_store02-atgap18?Ntk=P_key_Contributor_List&Ns=P_Sales_Rank&Ntx=mode+matchall',
    cls: 'flex col-span-2 col-start-4 col-end-6 justify-center w-full sm:w-24 md:w-36',
  },
  {
    el: <Target />,
    href: 'https://www.target.com/s?searchTerm=Bal+Khabra',
    cls: 'flex col-span-2 row-start-2 justify-center w-[80%] sm:w-24 md:w-32',
  },
  {
    el: <Walmart />,
    href: 'https://www.walmart.com/search?q=Bal+Khabra',
    cls: 'flex col-span-2 row-start-2 justify-center w-full sm:w-24 md:w-36',
  },
  {
    el: <Booksmellion />,
    href: 'https://www.booksamillion.com/search?query=Bal+Khabra',
    cls: 'flex col-span-2 row-start-2 justify-center w-full sm:w-52',
  },
];

const Hero = () => {
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
          {retailers.map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={item.cls + ' cursor-pointer'}
              variants={itemVariants}
              whileHover={{ scale: 1.08, opacity: 0.85 }}
              whileTap={{ scale: 0.97 }}
            >
              {item.el}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
