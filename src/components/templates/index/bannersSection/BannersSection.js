import styles from "./bannersSection.module.css";
import { Container, Row, Col } from "react-bootstrap";
import img1 from "@/public/images/banner-4taei-01.webp";
import img2 from "@/public/images/banner-4taei-02.webp";
import img3 from "@/public/images/banner-4taei-03.webp";
import img4 from "@/public/images/banner-4taei-04.webp";
import Link from "next/link";
import Image from "next/image";

export default function BannersSection() {
  return (
    <Container className="container-custom">
      <div className={styles.bannersSectionContainer} data-aos="zoom-in">
        <Row className={styles.bannersSectionRow}>
          <Col md={3} xs={6} className={styles.bannersSectionCol}>
            <div className={styles.imageContainer}>
              <Link href="">
                <Image  className={styles.image} src={img2} alt="Banner images" />
              </Link>
            </div>
          </Col>
          <Col md={3} xs={6} className={styles.bannersSectionCol}>
            <div className={styles.imageContainer}>
              <Link href="">
                <Image  className={styles.image} src={img4} alt="Banner images" />
              </Link>
            </div>
          </Col>
          <Col md={3} xs={6} className={styles.bannersSectionCol}>
            <div className={styles.imageContainer}>
              <Link href="">
                <Image  className={styles.image} src={img3} alt="Banner images" />
              </Link>
            </div>
          </Col>
          <Col md={3} xs={6} className={styles.bannersSectionCol}>
            <div className={styles.imageContainer}>
              <Link href="">
                <Image  className={styles.image} src={img1} alt="Banner images" />
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
