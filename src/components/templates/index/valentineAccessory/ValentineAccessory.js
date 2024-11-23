"use client";
import { useState } from "react";
import styles from "./valentineAccessory.module.css";
import ValentineAccessoryPart from "./ValentineAccessoryPart";
import { Container, Row, Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";


export default function ValentineAccessory({ allProducts }) {
  const [Products, setProducts] = useState(allProducts.slice(0, 8));

  return (
    <Container className="container-custom">
      <div className={styles.valentineSectionContainer} data-aos="fade-up">
        <Row>
          <Col className={styles.right} xs={12} lg={5}>
            <h2 className={styles.title}>اکسسوری های مناسب کادو ولنتاین</h2>
            <p className={styles.desc}>
              اگر به دنبال بهترین اکسسوری های مناسب کادو ولنتاین هستید، آوانگاره
              در این بخش یک راهنمای کامل در این خصوص آماده کرده است
            </p>
          </Col>

          <Col className={styles.left} xs={12} lg={7}>
            <Swiper
              slidesPerView={6}
              spaceBetween={30}
              className={styles.mySwiper}
              breakpoints={{
                100: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                576: {
                  slidesPerView: 4,
                  spaceBetween: 15,
                },
                768: {
                  slidesPerView: 6,
                  spaceBetween: 20,
                },
                992: {
                  slidesPerView: 6,
                  spaceBetween: 25,
                },
                1200: {
                  slidesPerView: 6,
                  spaceBetween: 30,
                },
              }}
            >
              {Products.map((product) => (
                <SwiperSlide key={product._id}>
                  <ValentineAccessoryPart {...product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
