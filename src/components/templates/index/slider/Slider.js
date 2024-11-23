"use client";
import styles from "./slider.module.css";
import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";
import sliderImg1 from "@/public/images/slider1.jpg";
import sliderImg2 from "@/public/images/slider2.jpg";
import sliderImg from "@/public/images/slider.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Pagination,Autoplay } from "swiper/modules";

export default function Slider() {
  return (
    <div className={styles.slider}>
      <Container className="container-custom">
        <Row className={styles.row}>
          <Col md={8} xs={12}>
            <Swiper
              className="mySwiper"
              spaceBetween={30}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              modules={[Autoplay,Pagination]}
              pagination={{
                clickable: true,
              }}
            >
              <SwiperSlide className={styles.sliderItem}>
                <Image
                  src={sliderImg1}
                  alt="Slider Image"
                  className={styles.sliderImages}
                />
              </SwiperSlide>
              <SwiperSlide className={styles.sliderItem}>
                <Image
                  src={sliderImg2}
                  alt="Slider Image"
                  className={styles.sliderImages}
                />
              </SwiperSlide>
            </Swiper>
          </Col>
          <Col md={3} xs={0}>
            <Image
              src={sliderImg}
              alt="Slider Image"
              className={styles.bannerImg}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
