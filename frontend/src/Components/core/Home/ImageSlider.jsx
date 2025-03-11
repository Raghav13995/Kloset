import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

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
    <div className="slider-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3} // Show 3 slides at a time
        loop={true}   
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        coverflowEffect={{
          rotate: 10, // Reduced tilt
          stretch: 100, // More spacing between slides
          depth: 200, // Adjust depth for better visibility
          modifier: 1,
          slideShadows: true,
        }}
        navigation
        pagination={{ clickable: true }}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="slide">
            <div className="image-wrapper">
              <img src={src} alt={`Slide ${index + 1}`} className="slide-image" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
