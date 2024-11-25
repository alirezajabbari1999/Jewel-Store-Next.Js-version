"use client";
import { useState } from "react";
import styles from "./accessoryPorbazdid.module.css";
import { Container, Row, Col } from "react-bootstrap";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { PiSealPercent } from "react-icons/pi";
import AccessoryPorbazdidPart from "./AccessoryPorbazdidPart";
import Image from "next/image";

export default function AccessoryPorbazdid({ allProducts }) {
  const [products, setProducts] = useState(allProducts.slice(0, 9));

  return (
    <Container className="container-custom">
      <div className={styles.porbazdidContainer} data-aos="fade-up">
        <Row className={styles.porbazdidContainerRow}>
          <Col className={styles.rightSide} md={8}>
            <div className={styles.titleBox}>
              <PiSealPercent className={styles.icon} />
              <h3 className={styles.title}>اکسسوری های پربازدید</h3>
            </div>

            <div className={styles.items}>
              <Row>
                {products.map((product) => (
                  <Col key={product._id} xs={4}>
                    <AccessoryPorbazdidPart {...product} />
                  </Col>
                ))}
              </Row>
            </div>
          </Col>

          {/* اسلایدر */}
          <Col className={styles.leftSide} md={3}>
            <div className={styles.sliderBox}>
              <p className={styles.sliderBoxTitle}>محصولات فروش ویژه</p>

              <Swiper
                className={styles.mySwiper}
                loop={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
              >
                {products.map((product) => (
                  <SwiperSlide key={product._id}>
                    <div className={styles.sliderItem}>
                      <div className={styles.top}>
                        <div className={styles.imageBox}>
                          <Image
                            src={product.img}
                            alt="image"
                            className={styles.image}
                            width={100}
                            height={100}
                          />
                        </div>
                      </div>
                      <div className={styles.bottom}>
                        <span>{product.name}</span>
                        <span> {product.price.toLocaleString()} تومان</span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
