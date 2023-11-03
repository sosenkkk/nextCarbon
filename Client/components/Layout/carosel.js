import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";

export default function Carosel() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        style={{
          "--swiper-navigation-color": "#fff",
          height: "90vh",
        }}
        loop={true}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <p className="caroselText">Uncompromising Quality</p>
          <img className="imageSlider" src="/img/slide8.jpg" alt="image" />
        </SwiperSlide>
        <SwiperSlide>
          <p className="caroselText">Sleek and Modern Design</p>
          <img className="imageSlider" src="/img/slide1.jpg" alt="image" />
        </SwiperSlide>
        <SwiperSlide>
          <p className="caroselText">Eco-Friendly Solutions</p>
          <img className="imageSlider" src="/img/slide9.jpg" alt="image" />
        </SwiperSlide>
        <SwiperSlide>
          <p className="caroselText">Customer-Centric Approach</p>
          <img className="imageSlider" src="/img/slide3.jpg" alt="image" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
