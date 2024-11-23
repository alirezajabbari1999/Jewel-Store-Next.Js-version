"use client";
import React, { useState, useEffect } from "react";
import styles from "./topbar.module.css";
import { Container } from "react-bootstrap";
import Image from "next/image";
import logoGif from "@/public/images/logo.gif";
import { FiSearch } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";

export default function Topbar() {
  const [isLogin, setIsLogin] = useState(false);
  const [overlyActive, setOverlyActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userRole, setUserRole] = useState("");

  const overlyCloseHandler = () => {
    setOverlyActive(false);
    setIsLoginFormOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const userLoginCheck = async () => {
      const res = await fetch("/api/auth/me");
      if (res.status === 200) {
        setIsLogin(true);
        const data = await res.json();
        if (data?.role === "ADMIN") {
          setUserRole("ADMIN");
        } else {
          setUserRole("USER");
        }
      } else {
        setIsLogin(false);
      }
    };
    userLoginCheck();
  }, []);

  return (
    <div className={`${styles.container} ${scrolled ? styles.scrolled : ""}`}>
      <Container>
        <div className={styles.topbar}>
          <div className={styles.rightSide}>
            <Image src={logoGif} alt="logo" className={styles.logo} />

            <div className={styles.searchBox}>
              <FiSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="جستجو در هزاران محصول..."
                className={styles.searchInput}
              />
            </div>

            <div className={styles.chooseCity}>
              <div className={styles.locationIconBox}>
                <IoLocationOutline className={styles.locationIcon} />
              </div>
              <div className={styles.locationTextBox}>
                <p> انتخاب مکان</p>
                <p className={styles.cityFilterText}>فیلتر شهر</p>
              </div>
            </div>
          </div>

          <div className={styles.leftSide}>
            <div className={styles.loginBtnBox}>
              {isLogin ? (
                userRole === "ADMIN" ? (
                  <div className={styles.dropdown}>
                    <Link href="/p-admin" className={styles.userPanelBtn}>
                      پنل ادمین
                      <IoIosArrowDown className={styles.icon} />
                    </Link>

                    <div className={styles.dropdown_content}>
                      <Link href="/p-admin/products">محصولات</Link>
                      <Link href="/p-admin/users">کاربران</Link>
                      <Link href="/p-admin/comments">کامنت ها</Link>
                      <Link href="/p-admin/tickets">تیکت ها</Link>
                      <Link href="/p-admin/discounts">تخفیف ها</Link>
                    </div>
                  </div>
                ) : (
                  <div className={styles.dropdown}>
                    <Link href="/p-user" className={styles.userPanelBtn}>
                      پنل کاربری
                      <IoIosArrowDown className={styles.icon} />
                    </Link>

                    <div className={styles.dropdown_content}>
                      <Link href="/p-user/orders">سفارشات</Link>
                      <Link href="/p-user/tickets">تیکت های پشتیبانی</Link>
                      <Link href="/p-user/comments">کامنت ها</Link>
                      <Link href="/p-user/wishlist">علاقمندی ها</Link>
                      <Link href="/p-user/account-detailes">جزییات اکانت</Link>
                    </div>
                  </div>
                )
              ) : (
                <Link href="/register" className={styles.loginBtn}>
                  ورود/ثبت نام
                </Link>
              )}
            </div>

            <div className={styles.userCartbox}>
              <IoCartOutline className={styles.cartIcon} />
              <span className={styles.cartCount}>0</span>
            </div>
          </div>
        </div>

        <div
          className={`overly ${overlyActive ? "active" : ""}`}
          onClick={() => overlyCloseHandler()}
        ></div>
      </Container>
    </div>
  );
}
