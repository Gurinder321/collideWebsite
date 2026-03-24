import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import PopUp from '../PopUp';
import { useModal } from '../../context/modalContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openModal } = useModal();

  const handleOpenModal = () => openModal(<PopUp />);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 640) setMenuOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '/' },
    { label: 'BOOKS', href: '/#books' },
    { label: 'BONUS', href: '/bonus' },
    { label: 'CONTACT', href: '/#contact' },
    { label: 'EVENTS', href: '/event' },
  ];

  return (
    <div className="w-full h-full max-h-28">
      <motion.header
        className="w-full fixed top-0 left-0 right-0 z-50 max-sm:px-6 py-4 pt-4 px-6 flex flex-col justify-between items-center"
        animate={{
          backgroundColor: scrolled ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,1)',
          boxShadow: scrolled
            ? '0 2px 24px -2px rgba(0,0,0,0.07)'
            : '0 1px 0 0 rgba(0,0,0,0.06)',
        }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{ backdropFilter: scrolled ? 'blur(18px)' : 'none' }}
      >
        <div className="w-full h-12 flex font-poppins justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="w-1/2 relative z-50 flex justify-start gap-5 font-poppins font-medium sm:justify-end"
          >
            <Image
              src="/logo.png"
              width={180}
              height={120}
              alt="logo"
              className="relative right-10 sm:left-24"
            />
          </Link>

          {/* Desktop subscribe button */}
          <div className="w-1/2 flex justify-end max-sm:hidden font-poppins gap-5 font-medium">
            <motion.button
              onClick={handleOpenModal}
              className="z-10 text-[#d394e2] text-sm px-4 py-2 rounded-full border border-[#eec5f8] hover:bg-[#fdf0ff] transition-colors duration-200"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Subscribe!
            </motion.button>
          </div>

          {/* Hamburger */}
          <div className="hidden max-sm:flex justify-end z-50">
            <button
              onClick={toggleMenu}
              className="focus:outline-none p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <motion.div animate={menuOpen ? 'open' : 'closed'} className="flex flex-col gap-[5px] w-5">
                <motion.span
                  className="block h-[2px] bg-gray-800 rounded-full origin-center"
                  variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 7 } }}
                  transition={{ duration: 0.25 }}
                />
                <motion.span
                  className="block h-[2px] bg-gray-800 rounded-full"
                  variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block h-[2px] bg-gray-800 rounded-full origin-center"
                  variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -7 } }}
                  transition={{ duration: 0.25 }}
                />
              </motion.div>
            </button>
          </div>
        </div>

        {/* Desktop nav links */}
        <nav className="max-sm:hidden w-full sm:max-w-[400px] h-12 flex items-center justify-between font-poppins font-medium text-xs text-gray-700">
          {navLinks.map(({ label, href }) => (
            <Link key={label} href={href}>
              <motion.span
                className="relative group cursor-pointer hover:text-gray-500 transition-colors duration-300"
                whileHover={{ y: -1 }}
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#d394e2] group-hover:w-full transition-all duration-300" />
              </motion.span>
            </Link>
          ))}
        </nav>
      </motion.header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            key="mobile-nav"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 bg-white/92 backdrop-blur-xl z-40 flex flex-col items-start justify-start pt-28 px-8"
          >
            {navLinks.map(({ label, href }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07, type: 'spring', stiffness: 300, damping: 28 }}
                className="w-full border-b border-gray-100 py-4"
              >
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="text-lg font-poppins font-medium text-gray-800 hover:text-[#d394e2] transition-colors duration-200"
                >
                  {label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: navLinks.length * 0.07, type: 'spring', stiffness: 300, damping: 28 }}
              className="mt-6"
            >
              <button
                onClick={() => { handleOpenModal(); setMenuOpen(false); }}
                className="text-[#d394e2] text-lg font-poppins font-medium border-b border-[#d394e2] pb-1"
              >
                Subscribe!
              </button>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
