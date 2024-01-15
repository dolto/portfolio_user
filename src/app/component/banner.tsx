'use client'
import "./banner.css"
import "./swiper.css"
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {Navigation, Pagination} from "swiper/modules";

function Banner(){
	return (
		<section className="banner">
			<Swiper slidesPerView={1} spaceBetween={30} loop={true} pagination={{clickable:true}} navigation={true} modules={[Pagination, Navigation]} className="mySwiper">
				<SwiperSlide>1</SwiperSlide>
				<SwiperSlide>2</SwiperSlide>
				<SwiperSlide>3</SwiperSlide>
			</Swiper>
		</section>
	)
}

export default Banner;