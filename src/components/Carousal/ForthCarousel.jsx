import React, { useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { instagramPhotos } from '@/json/instaphotos';

const INSTAGRAM_URL = 'https://www.instagram.com/authorbalkhabra/';
const SCROLL_DURATION = 50000; // ms for one full loop

const ForthCarousel = () => {
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const rateRef = useRef(1);
  const rafRef = useRef(null);

  // Grab the CSS animation after mount
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const tryGetAnim = () => {
      const anims = el.getAnimations();
      if (anims.length > 0) {
        animRef.current = anims[0];
      } else {
        requestAnimationFrame(tryGetAnim);
      }
    };
    tryGetAnim();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const tweenRate = useCallback((target) => {
    cancelAnimationFrame(rafRef.current);
    const step = () => {
      const current = rateRef.current;
      const diff = target - current;
      if (Math.abs(diff) < 0.005) {
        rateRef.current = target;
        if (animRef.current) animRef.current.playbackRate = target;
        return;
      }
      // Ease toward target: feels like deceleration
      rateRef.current = current + diff * 0.06;
      if (animRef.current) animRef.current.playbackRate = rateRef.current;
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  }, []);

  return (
    <div
      className="relative mb-4 w-full overflow-hidden"
      onMouseEnter={() => tweenRate(0)}
      onMouseLeave={() => tweenRate(1)}
    >
      <div ref={trackRef} className="insta-track flex gap-6 items-center w-max">
        {[...instagramPhotos, ...instagramPhotos].map((item, index) => (
          <a
            key={index}
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-[226px] aspect-square flex-shrink-0 overflow-hidden block"
          >
            <Image
              src={item.url}
              alt={item.alt}
              width={226}
              height={226}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <svg
                className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
          </a>
        ))}
      </div>

      <style jsx>{`
        .insta-track {
          animation: insta-scroll ${SCROLL_DURATION}ms linear infinite;
        }
        @keyframes insta-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default ForthCarousel;
