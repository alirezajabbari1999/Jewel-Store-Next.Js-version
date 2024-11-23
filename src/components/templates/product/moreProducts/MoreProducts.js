"use client";
import styles from "./moreProducts.module.css";
import { Container } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import MoreProduct from "./MoreProduct";

export default function MoreProducts({ moreProducts }) {
  return (
    <Container className={styles.container} data-aos="fade-up">
      <div className={styles.moreProducts}>
        <span className={styles.title}>محصولات مرتبط</span>

        <div className={styles.moreProductsSlider}>
          <Swiper
            slidesPerView={5}
            spaceBetween={30}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
            breakpoints={{
              100: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              320: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              576: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 25,
              },
              1200: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
            }}
          >
            {moreProducts.map((product) => (
              <SwiperSlide key={product._id}>
                <MoreProduct {...product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </Container>
  );
}
