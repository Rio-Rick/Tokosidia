"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const Hero = () => {
  return (
    <div className="mt-2">
      <div className="main-container">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000 }}
          speed={500}
          pagination={{ clickable: true }}
          spaceBetween={10}
          slidesPerView={1}
          className="h-full w-5/6 rounded-lg "
        >
          <SwiperSlide>
            <img
              src="https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/2/28/1f028203-e4a5-4ce5-abd0-71e32218e370.jpg.webp?ect=4g"
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/3/7/600bdae1-ba40-4945-946d-9e4962e1954a.jpg.webp?ect=3g"
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/3/7/35903416-b063-4462-b2d3-c809bbf17259.jpg.webp?ect=3g"
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/3/8/81ea2616-8fc7-4afa-b68e-55b9fc308335.jpg.webp?ect=3g"
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;
