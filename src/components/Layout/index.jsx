import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { motion, useScroll, useSpring } from 'framer-motion'

const Layout = ({ children }) => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <div className='w-full'>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#d394e2] origin-left z-[60]"
        style={{ scaleX }}
      />

      <Navbar />
      <div className='bg-[#F8F3EC]'>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
