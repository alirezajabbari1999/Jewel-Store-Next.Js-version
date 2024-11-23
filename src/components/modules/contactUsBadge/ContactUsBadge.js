"use client";
import React, { useState } from "react";
import styles from "./contactUsBadge.module.css";
import { AiFillMessage } from "react-icons/ai";
import { FiPhone } from "react-icons/fi";
import { CiMobile2 } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

export default function ContactUsBadge() {
  const [overlyActive, setOverlyActive] = useState(false);

  const overlyHandler = () => {
    setOverlyActive(!overlyActive);
  };
  const overlyCloseHandler = () => {
    setOverlyActive(!overlyActive);
  };

  return (
    <div className={styles.contactBadgeContainer}>
      <div
        // className={`${styles["contactCircle"]} ${overlyActive ? "active" : ""}`}
        className={styles.contactCircle}
        onClick={() => overlyHandler()}
      >
        <div className={styles.badgeTitle}>
          <span className={styles.icon}>
            <AiFillMessage />
          </span>
          <span className={styles.title}>تماس با ما</span>
        </div>

        <div
          className={`${styles.contactBadgeContent} ${overlyActive ? styles.activeContent : ""}`}
        >
          <div className={styles.item}>
            <a href="" className={styles.itemLink}>
              <span className={styles.contentWay}>تماس با فروشگاه</span>
              <span className={styles.storeCallIcon}>
                <FiPhone className={styles.icon} />
              </span>
            </a>
          </div>
          <div className={styles.item}>
            <a href="" className={styles.itemLink}>
              <span className={styles.contentWay}>تماس با پشتیبان فروش</span>
              <span className={styles.supportCallIcon}>
                <CiMobile2 className={styles.icon} />
              </span>
            </a>
          </div>
          <div className={styles.item}>
            <a href="" className={styles.itemLink}>
              <span className={styles.contentWay}>ارتباط از طریق واتس اپ</span>
              <span className={styles.whatsAppIcon}>
                <FaWhatsapp className={styles.icon} />
              </span>
            </a>
          </div>
          <div className={styles.item}>
            <a href="" className={styles.itemLink}>
              <span className={styles.contentWay}>ارتباط از طریق تلگرام</span>
              <span className={styles.telegramIcon}>
                <FaTelegram className={styles.icon} />
              </span>
            </a>
          </div>
          <div className={styles.item}>
            <a href="" className={styles.itemLink}>
              <span className={styles.contentWay}>
                ارتباط از طریق اینستاگرام
              </span>
              <span className={styles.instagramIcon}>
                <FaInstagram className={styles.icon} />
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* اين ديو مربوط به هاله سياهي هست كه با 
      باز شدن بخش راه هاي ارتباطي صفحه رو فرا ميگيره */}
      {/* همچنين يدونه آن كليك هم بهش دادم كه با كليك روي هر جاي صفحه
      بخش مربوط به راه هاي ارتباطي بسته شه */}
      <div
        className={`overly ${overlyActive ? "active" : ""}`}
        onClick={() => overlyCloseHandler()}
      ></div>
    </div>
  );
}
