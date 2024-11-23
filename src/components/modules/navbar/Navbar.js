"use client";
import React, { useState, useEffect } from "react";
import styles from "./navbar.module.css";
import { Container } from "react-bootstrap";
import { IoMenu } from "react-icons/io5";
import { RiHome3Line } from "react-icons/ri";
import { MdOutlineStorefront, MdPayment } from "react-icons/md";
import { LuChevronLeft } from "react-icons/lu";
import Link from "next/link";

export default function Navbar() {
  // اين استيت براي اطلاع از اينه كه كدوم آيتم منو الان هاور شده
  const [activeItem, setActiveItem] = useState(null);
  // این استیت پایین رو ایجاد کردم که اگه روی دکمه دسبندی محصولات هاور شد مقدارش برابر با پروداکت شه تا بتونم کارهایی که نیازه رو انجام بدم
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null); // اضافه شده
  const [allCategories, setAllCategories] = useState([]);

  const handleMouseEnter = (index) => {
    setActiveItem(index);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/Category");
      const data = await res.json();
      setAllCategories(data);
    };
    fetchCategories();
  }, []);

  const handleMouseEnterCategory = () => {
    setActiveCategory("products");
  };

  const handleMouseLeaveCategory = () => {
    setActiveCategory(null);
    setActiveSubCategory(null);
  };

  return (
    <>
      <Container >
        <div className={styles.navbar}>
          <ul className={styles.menu}>
            <li
              className={styles.menuItem}
              onMouseEnter={() => {
                handleMouseEnter(0);
                handleMouseEnterCategory();
              }}
              onMouseLeave={handleMouseLeaveCategory}
            >
              <IoMenu className={styles.icon} />
              <p>دسته بندی محصولات</p>
              {activeCategory === "products" && (
                <div
                  className={styles.megaMenu}
                  onMouseEnter={handleMouseEnterCategory}
                  onMouseLeave={handleMouseLeaveCategory}
                >
                  <ul className={styles.categoryList}>
                    {allCategories.map((category) => (
                      <li
                        key={category._id}
                        className={styles.categoryItem}
                        onMouseEnter={() => setActiveSubCategory(category._id)}
                        onMouseLeave={() => setActiveSubCategory(null)} // اضافه شده
                      >
                        <span>{category.title}</span>
                        <LuChevronLeft />
                        {/* فقط وقتی که activeSubCategory برابر با دسته‌بندی فعلی باشد، ساب منو نمایش داده می‌شود */}
                        {activeSubCategory === category._id && (
                          <ul className={styles.subMenuList}>
                            {category.subMenu.map((sub) => (
                              <li key={sub._id}>
                                <Link href="" className={styles.subMenuItem}>
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>

            <li
              className={styles.menuItem}
              onMouseEnter={() => handleMouseEnter(1)}
            >
              <Link href="/" className={styles.menuLink}>
                <RiHome3Line className={styles.icon} />
                <p>صفحه اصلی</p>
              </Link>
            </li>

            <li
              className={styles.menuItem}
              onMouseEnter={() => handleMouseEnter(2)}
            >
              <Link href="/shop" className={styles.menuLink}>
                <MdOutlineStorefront className={styles.icon} />
                <p>فروشگاه</p>
              </Link>
            </li>

            <li
              className={styles.menuItem}
              onMouseEnter={() => handleMouseEnter(3)}
            >
              <Link href="/payment" className={styles.menuLink}>
                <MdPayment className={styles.icon} />
                <p>پرداخت</p>
              </Link>
            </li>
            <span
              className={`${styles.navbarHoverBackground} ${
                activeItem !== null ? styles[`position${activeItem}`] : ""
              }`}
            ></span>
          </ul>
        </div>
      </Container>
      <hr />
    </>
  );
}
