"use client";
import { useState } from "react";
import styles from "./handArtSection.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Container, Row, Col } from "react-bootstrap";
import { FaMedal } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from "next/link";
import HandArtSectionPart from "./HandArtSectionPart";

export default function HandArtSection({ allProducts }) {
  const [Products, setProducts] = useState(allProducts.slice(0, 6));

  return (
    <Container className="container-custom">
      <div className={styles.handAartContainer} data-aos="fade-up">
        <div className={styles.handArtTitleBox}>
          <FaMedal className={styles.medalIcon} />
          <h3>پيچ و خم فلز در هنر دست</h3>
        </div>
        <div className={styles.HandArtRow}>
          <Row className={styles.row}>
            <Col className={styles.right} lg={3} sm={0}>
              <p className={styles.desc}>
                بستن محکم و نقش پیچ آن ماندگاری واقعی را به آن می بخشد ، در حالی
                که تفاسیر متنوع اجازه می دهد تا احساسات منحصر به فرد بیان شود.
                در عشق خود قفل کنید ، برای همیشه.
              </p>
              <Link href="/shop" className={styles.handArtLink}>
                <span className={styles.linkTitle}>مشاهده محصولات</span>
                <span className={styles.linkIconBox}>
                  <FaArrowLeftLong className={styles.linkIcon} />
                </span>
              </Link>
            </Col>

            <Col className={styles.left} lg={9} sm={12}>
              <div className={styles.slider}>
                <Swiper
                  slidesPerView={5}
                  spaceBetween={30}
                  loop="true"
                  modules={[Autoplay]}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  className={styles.mySwiper}
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
                  {Products.map((product)=>(
                  <SwiperSlide key={product._id}>
                    <HandArtSectionPart {...product}/>
                  </SwiperSlide>
                  ))}

                </Swiper>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
}
