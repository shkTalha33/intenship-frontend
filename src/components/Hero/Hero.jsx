import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import Buttons from './HeroText';

import 'swiper/css';
import 'swiper/css/effect-fade';
import { EffectFade,Autoplay } from 'swiper/modules';
import './_hero.scss';

import bg1 from "../../assets/images/img_bg_1.jpg"
import bg2 from "../../assets/images/img_bg_2.jpg"
import bg3 from "../../assets/images/img_bg_3.jpg"

export default function Hero() {
  return (
    <>
       <div className="hero  overflow-hidden "  >
       <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        effect={'fade'}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
       
        modules={[EffectFade,Autoplay]}
      
      >
        <SwiperSlide>
          <Buttons bg={bg1} text1="MEN'S" text2="SHOES" text3="Collections" text4="New Trending Shoes" />
        </SwiperSlide>
        <SwiperSlide>
          <Buttons bg={bg2} text1=" HUGE" text2="SALE" text3="50% OFF" text4="Big sale sandals" />
        </SwiperSlide>
        <SwiperSlide>
          <Buttons bg={bg3} text1="NEW" text2="ARRIVAL" text3="UP TO 30% OFF" text4="New stylish shoes for men" />
        </SwiperSlide>
      </Swiper>
       </div>
       
    </>
  )
}
