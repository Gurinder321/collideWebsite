import React from 'react';
import Image from 'next/image';
import { instagramPhotos } from '@/json/instaphotos';

const ForthCarousel = () => {
  return (
    <div className="relative mb-4 w-full overflow-hidden">
      {/* Scrolling Container */}
      <div className="flex gap-6 items-center w-max" id="carousel">
        {instagramPhotos.map((item, index) => (
          <div
            key={index}
            className="w-[226px] aspect-square relative flex justify-center"
          >
            <Image src={item.url} alt={`post ${index}`} width={226} height={340} />
          </div>
        ))}
        {instagramPhotos.map((item, index) => (
          <div
            key={`${index}-duplicate`}
            className="w-[226px] aspect-square relative flex justify-center"
          >
            <Image src={item.url} alt={`post ${index}`} width={226} height={340} />
          </div>
        ))}
      </div>

      {/* Style for Animation */}
      <style jsx>{`
        #carousel {
          display: flex;
          animation: scroll 50s linear infinite;
          transition: animation-play-state 1s ease-in-out; 
        }

        #carousel:hover {
          animation-play-state: paused;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default ForthCarousel;
