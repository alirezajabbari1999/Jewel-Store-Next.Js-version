"use client";
import React, { useRef, useEffect } from "react";
import styles from "./addBanner.module.css";
import { Container, Row, Col } from "react-bootstrap";
import Tilt from "vanilla-tilt";
import Link from "next/link";
import banner1 from "@/public/images/adsbanner1.webp";
import banner2 from "@/public/images/adsbanner2.webp";
import Image from "next/image";

export default function AddBaner() {
  const tiltRef1 = useRef();
  const tiltRef2 = useRef();

  useEffect(() => {
    if (tiltRef1.current) {
      Tilt.init(tiltRef1.current, {
        maxTilt: 5,
        speed: 400,
        perspective: 1400,
        scale: 1.0001,
        axis: "all",
      });
    }
    if (tiltRef2.current) {
      Tilt.init(tiltRef2.current, {
        maxTilt: 5,
        speed: 400,
        perspective: 1400,
        scale: 1.0001,
        axis: "all",
      });
    }
  }, []);

  return (
    <Container className="container-custom">
      <div className={styles.adsBannerContainer} data-aos="fade-up">
        <Row>
          <Col xs={12} md={6}>
            <Link href="">
              <div ref={tiltRef1}>
                <Image src={banner2} alt="Banner" className={styles.adsImg} />
              </div>
            </Link>
          </Col>

          <Col xs={12} md={6}>
            <Link href="">
              <div ref={tiltRef2}>
                <Image src={banner1} alt="Banner" className={styles.adsImg} />
              </div>
            </Link>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
