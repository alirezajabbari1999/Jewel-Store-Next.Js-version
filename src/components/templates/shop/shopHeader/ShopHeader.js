"use client";
import { useState } from "react";
import styles from "./shopHeader.module.css";
import { BsSortDown } from "react-icons/bs";
import { Container } from "react-bootstrap";
import BreadCrumb from "@/src/components/modules/breadCrumb/BreadCrumb";

export default function ShopHeader({ allProducts }) {
  const [menuItemActive, setMenuItemActive] = useState(0);

  const menuItemActiveHandler = (id) => {
    setMenuItemActive(id);
  };

  return (
    <Container>
      <div className={styles.shopHeader}>
        <BreadCrumb route={"فروشگاه"} />

        <div className={styles.shopHeaderContainer}>
          <div className={styles.right}>
            <span className={styles.sortTitle}>
              <BsSortDown className={styles.sortIcon} />
              مرتب سازی :
            </span>

            <div className={styles.shopMenu}>
              <ul className={styles.menu}>
                <li
                  className={`${styles.shopMenuItem} ${
                    menuItemActive == 0 ? styles.active : ""
                  }`}
                  onClick={() => menuItemActiveHandler(0)}
                >
                  پیشفرض
                </li>
                <li
                  className={`${styles.shopMenuItem} ${
                    menuItemActive == 1 ? styles.active : ""
                  }`}
                  onClick={() => menuItemActiveHandler(1)}
                >
                  محبوب ترین
                </li>
                <li
                  className={`${styles.shopMenuItem} ${
                    menuItemActive == 2 ? styles.active : ""
                  }`}
                  onClick={() => menuItemActiveHandler(2)}
                >
                  جدیدترین
                </li>
                <li
                  className={`${styles.shopMenuItem} ${
                    menuItemActive == 3 ? styles.active : ""
                  }`}
                  onClick={() => menuItemActiveHandler(3)}
                >
                  ارزانترین
                </li>
                <li
                  className={`${styles.shopMenuItem} ${
                    menuItemActive == 4 ? styles.active : ""
                  }`}
                  onClick={() => menuItemActiveHandler(4)}
                >
                  گرانترین
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.left}>
            نمایش{" "}
            <span className={styles.leftSpan}> {allProducts.length} </span> کالا
          </div>
        </div>
      </div>
    </Container>
  );
}
