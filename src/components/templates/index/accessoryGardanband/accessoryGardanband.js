"use client";
import { useState, useEffect } from "react";
import styles from "./accessoryGardanband.module.css";
import { Container } from "react-bootstrap";
import Product from "@/src/components/modules/product/Product";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

export default function AccessoryGardanband({ allProducts }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const filteredProducts = allProducts.filter((product) =>
      product.type.toLowerCase().includes("گردنبند")
    );
    setProducts(filteredProducts);
  }, [allProducts]);

  return (
    <Container className="container-custom">
      <div>
        <div className={styles.accessoryGardanbandContainer} data-aos="fade-up">
          <h4 className={styles.title}>اکسسوری گردنبند</h4>

          <div className={styles.accessoryGardanbandSlider}>
            <Swiper
              slidesPerView={5}
              spaceBetween={30}
              navigation={true}
              loop="true"
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
              {products.map((product) => (
                <SwiperSlide key={product._id}>
                  <Product {...product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </Container>
  );
}
