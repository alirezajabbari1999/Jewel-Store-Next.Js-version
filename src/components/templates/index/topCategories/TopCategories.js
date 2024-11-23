"use client";
import styles from "./top.module.css";
import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import topCategoriesImg1 from "@/public/images/topCategories1.webp";
import topCategoriesImg2 from "@/public/images/topCategories2.webp";
import topCategoriesImg3 from "@/public/images/topCategories3.webp";
import topCategoriesImg4 from "@/public/images/topCategories4.webp";
import topCategoriesImg5 from "@/public/images/topCategories5.webp";
import topCategoriesImg6 from "@/public/images/topCategories6.webp";
import topCategoriesImg7 from "@/public/images/topCategories7.webp";
import topCategoriesImg8 from "@/public/images/topCategories8.webp";

export default function TopCategories() {
  return (
    <div className={styles.topCategories}>
      <Container className="container-custom">
        <p className={styles.title}>دسته های برتر</p>
        <Swiper
          slidesPerView={7}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
          breakpoints={{
            100: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            400: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            576: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            992: {
              slidesPerView: 4,
              spaceBetween: 25,
            },
            1200: {
              slidesPerView: 7,
              spaceBetween: 30,
            },
          }}
        >
          <SwiperSlide className={styles.sliderItem}>
            <Image
              src={topCategoriesImg1}
              alt="Top Categories Image"
              className={styles.sliderImg}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.sliderItem}>
            <Image
              src={topCategoriesImg2}
              alt="Top Categories Image"
              className={styles.sliderImg}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.sliderItem}>
            <Image
              src={topCategoriesImg3}
              alt="Top Categories Image"
              className={styles.sliderImg}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.sliderItem}>
            <Image
              src={topCategoriesImg4}
              alt="Top Categories Image"
              className={styles.sliderImg}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.sliderItem}>
            <Image
              src={topCategoriesImg5}
              alt="Top Categories Image"
              className={styles.sliderImg}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.sliderItem}>
            <Image
              src={topCategoriesImg6}
              alt="Top Categories Image"
              className={styles.sliderImg}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.sliderItem}>
            <Image
              src={topCategoriesImg7}
              alt="Top Categories Image"
              className={styles.sliderImg}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.sliderItem}>
            <Image
              src={topCategoriesImg8}
              alt="Top Categories Image"
              className={styles.sliderImg}
            />
          </SwiperSlide>
        </Swiper>
      </Container>
    </div>
  );
}
