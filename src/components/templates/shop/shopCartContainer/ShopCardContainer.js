"use client";
import { useState, useEffect } from "react";
import styles from "./shopCardContainer.module.css";
import Link from "next/link";
import { Container, Row, Col, Spinner } from "react-bootstrap"; // استفاده از Spinner به عنوان لودینگ
import ShopCard from "../shopCard/ShopCard";

export default function ShopCardContainer({ allProducts }) {
  const loadMoreCount = 4;
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !loading &&
        visibleProducts < allProducts.length
      ) {
        setLoading(true);
        setTimeout(() => {
          setVisibleProducts((prev) =>
            Math.min(prev + loadMoreCount, allProducts.length)
          );
          setLoading(false);
        }, 1000); // زمان انتظار برای نمایش لودینگ قبل از رندر
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [allProducts, loading, visibleProducts]);

  return (
    <Container>
      <div className={styles.shopCardContainer}>
        <Row>
          {allProducts.slice(0, visibleProducts).map((product, index) => (
            <Col
              key={index}
              lg={3}
              md={4}
              sm={6}
              xs={12}
              className={styles.fadeIn}
            >
              <Link href={`/product/${product._id}`}>
                <ShopCard product={product} />
              </Link>
            </Col>
          ))}
        </Row>
        {loading && (
          <div className={styles.loading}>
            <Spinner animation="border" className={styles.loadingIcon} />
          </div>
        )}
      </div>
    </Container>
  );
}
