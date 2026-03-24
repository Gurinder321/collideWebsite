import { motion } from 'framer-motion';

const ITEMS = [
  'OFF THE ICE', 'BAL KHABRA', 'COLLIDE', 'SPIRAL', 'REVOLVE', 'EMBRACE',
  'OFF THE ICE', 'BAL KHABRA', 'COLLIDE', 'SPIRAL', 'REVOLVE', 'EMBRACE',
];

const Marquee = ({ dark = false }) => {
  const bg = dark ? 'bg-[#1f1e2c]' : 'bg-[#d178b0]';
  const textColor = dark ? 'text-[#d178b0]' : 'text-white';
  const dotColor = dark ? 'text-[#d178b0]' : 'text-white/60';

  return (
    <div className={`${bg} w-full overflow-hidden py-3 select-none`}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
      >
        {[...ITEMS, ...ITEMS].map((text, i) => (
          <span key={i} className="flex items-center">
            <span className={`${textColor} font-poppins font-semibold tracking-[0.18em] text-xs sm:text-sm uppercase px-4`}>
              {text}
            </span>
            <span className={`${dotColor} text-[8px]`}>◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
