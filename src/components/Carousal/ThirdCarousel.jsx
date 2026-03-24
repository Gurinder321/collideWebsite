import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';

const ThirdCarousal = ({ data }) => {
  const swiperRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    if (swiper && swiper.realIndex !== undefined) {
      setSelectedIndex(swiper.realIndex);
    }
  };

  return (
    <div className="w-full bg-[#1F1E2C] h-full gap-2 sm:gap-4  md:p-6 p-8 sm:py-14 text-white text-center flex flex-col justify-between items-center">
      <div className="flex w-full justify-between items-center gap-2 sm:gap-4">
        {/* Custom Previous Button */}
        <button
          onClick={() => swiperRef.current.swiper.slidePrev()} // Updated this to slidePrev()
          className={`rounded-full
            hover:bg-[conic-gradient(from_270deg_at_50%_50%,_#ffffff_0%,_#000000_50%)]
             h-8 sm:h-14 md:h-16 aspect-square relative bg-gray-600 p-1 flex justify-center items-center ${
            selectedIndex === 0 ? 'opacity-25' : ''
          }`}
        >
          <FaChevronLeft className="text-white bg-[#1F1E2C] h-full w-full p-2 sm:p-3 rounded-full z-[1]" />
        </button>

        {/* Swiper Carousel */}
        <div className="w-full lg:max-w-[550px] md:max-w-[380px] sm:max-w-[330px] max-w-[230px]">
          <Swiper
            ref={swiperRef}
            spaceBetween={30}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            navigation={{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next',
            }}
            modules={[Autoplay, EffectFade, Navigation]}
            onSlideChange={handleSlideChange}
            className="w-full overflow-hidden"
          >
            {data?.map((item, index) => (
              <SwiperSlide key={index} className="flex-shrink-0 flex justify-center w-full relative">
                <p className="text-base max-sm:text-base sm:text-xl md:text-[28px] max-w-2xl mx-auto sm:mt-6 font-amerigo italic font-semibold tracking-wide">
                  {item.text}
                </p>
                <p className="text-sm sm:text-base md:text-lg uppercase mt-4 font-dmserif font-semibold">
                  {item.author}
                </p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Custom Next Button */}
        <button
          onClick={() => swiperRef.current.swiper.slideNext()}
          className={`rounded-full h-8 sm:h-14 md:h-16 aspect-square relative 
            hover:bg-[conic-gradient(from_90deg_at_50%_50%,_transparent_0%,_#000000_50%,_#ffffff_100%)]
             bg-gray-600 p-1 flex justify-center items-center ${
            selectedIndex === data.length - 1 ? 'opacity-25' : ''
          }`}
        >
          <FaChevronRight className="text-white bg-[#1F1E2C] h-full w-full p-2 sm:p-3 rounded-full z-[1]" />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center mt-4">
        {data?.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 mx-1 rounded-full border-2 border-[#4C4D56] ${
              index === selectedIndex ? 'bg-white border-white' : 'bg-transparent'
            }`}
            onClick={() => swiperRef.current.swiper.slideToLoop(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ThirdCarousal;
