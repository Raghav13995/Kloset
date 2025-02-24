import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
  "https://i.pinimg.com/originals/a7/96/c6/a796c6f3dde44d03504a1e69c89e3046.jpg",
  "https://www.shaadidukaan.com/vogue/wp-content/uploads/2020/03/vows_and_tales-engagement-outfits.jpg",
  "https://i.pinimg.com/originals/46/0c/42/460c42af5b036016009002d95dccc23f.jpg",
  "https://i.pinimg.com/originals/a5/80/1b/a5801bb067fcd4497a695dbd6f85fae1.jpg",
  "https://i.pinimg.com/736x/38/f6/b9/38f6b925207355f092d50500c26161be.jpg",
  "https://i.pinimg.com/originals/cf/56/a1/cf56a148aa5926ecf97122c1c3af49b1.jpg"
];

const ImageSlider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={1}
      slidesPerView={4}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
    >
      {images.map((src, index) => (
        <SwiperSlide key={index}>
          <img
            src={src}
            alt={`Slide ${index + 1}`}
            style={{ width: "100%", height: "600px", objectFit: "cover" }} 
            className="rounded-lg"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;
