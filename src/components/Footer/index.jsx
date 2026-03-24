import { FaInstagram, FaTiktok, FaGoodreadsG, FaAmazon, FaSpotify } from 'react-icons/fa';
import { motion } from 'framer-motion';

const socialLinks = [
  { icon: FaInstagram, href: 'https://www.instagram.com/authorbalkhabra', label: 'Instagram' },
  { icon: FaTiktok, href: 'https://www.tiktok.com/@authorbalkhabra', label: 'TikTok' },
  { icon: FaSpotify, href: 'https://open.spotify.com/playlist/1duhzFh4A3etfHzlyj8PFP', label: 'Spotify' },
  { icon: FaGoodreadsG, href: 'https://www.goodreads.com/author/show/22668895.Bal_Khabra', label: 'Goodreads' },
  { icon: FaAmazon, href: 'https://www.amazon.com/stores/Bal-Khabra/author/B0B98R4XCD', label: 'Amazon' },
];

const Footer = () => {
  return (
    <footer className="min-h-[10vh] bg-[#1f1e2c] flex justify-center text-white py-4">
      <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-4">
        <div className="flex space-x-6 text-2xl sm:text-3xl">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ y: -3, color: '#d394e2' }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="transition-colors duration-200"
            >
              <Icon className="p-[2px]" />
            </motion.a>
          ))}
        </div>
        <p className="text-xs sm:text-sm text-center text-gray-300 px-6">
          COPYRIGHT © 2024 BAL KHABRA | ALL RIGHTS RESERVED
        </p>
      </div>
    </footer>
  );
};

export default Footer;
