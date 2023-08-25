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
          delay: 2500,
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
          <p className="caroselText">Hello my name is shashank Raj</p>
          <img className="imageSlider" src="/img/main2.jpg" alt="image" />
        </SwiperSlide>
        <SwiperSlide>
          <p className="caroselText">Hello my name is shashank Raj</p>
          <img className="imageSlider" src="/img/main1.jpg" alt="image" />
        </SwiperSlide>
        <SwiperSlide>
          <p className="caroselText">Hello my name is shashank Raj</p>
          <img className="imageSlider" src="/img/main2.jpg" alt="image" />
        </SwiperSlide>
        <SwiperSlide>
          <p className="caroselText">Hello my name is shashank Raj</p>
          <img className="imageSlider" src="/img/main1.jpg" alt="image" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
