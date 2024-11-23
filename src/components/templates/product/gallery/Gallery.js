"use client";
import { useState } from "react";
import styles from "./gallery.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
import img1 from "@/public/images/handart1.png";
import img2 from "@/public/images/handart2.png";

export default function Gallery({ product }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const images = product.img ? [product.img] : []; // اینجا فرض بر این است که محصول شما یک تصویر دارد و آن را در فیلد "images" ذخیره کرده‌اید.

  return (
    <>
      <div className={styles.bigSlider} data-aos="fade-up">
        <Swiper
          style={{
            "--swiper-navigation-color": "#cba583",
            "--swiper-pagination-color": "#cba583",
          }}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }} //  اسلایدرها از طریق ویژگی thumbs به هم لینک شده‌اند،
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2 gallery-slider"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <Image
                src={img}
                alt="image"
                className={styles.sliderBigImage}
                width={1000}
                height={1000}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={styles.smallSlider}>
        <Swiper
          onSwiper={setThumbsSwiper} // برای لینک شدن با اسلایدر بالا
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="gallery-slider-2"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <Image
                src={img}
                alt="image"
                className={styles.sliderSmallImage}
                width={100}
                height={100}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
