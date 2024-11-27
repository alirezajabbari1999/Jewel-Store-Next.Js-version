"use client";
import React, { useState, useEffect } from "react";
import styles from "./sidebar.module.css";
import { IoClose } from "react-icons/io5";
import { LuChevronLeft } from "react-icons/lu"; // فرض بر این است که این آیکون از این پکیج می‌آید.
import Link from "next/link";

export default function Sidebar({ isOpen, closeSidebar }) {
  const [allCategories, setAllCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null); // برای نگه‌داری وضعیت دسته‌بندی فعال

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/Category");
      const data = await res.json();
      setAllCategories(data);
    };
    fetchCategories();
  }, []);

  const toggleSubMenu = (categoryId) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId); // اگر دسته‌بندی قبلاً فعال بود، آن را غیرفعال کن
  };

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.active : ""}`}>
      <div className={styles.closeBtnBox} onClick={closeSidebar}>
        <IoClose className={styles.closeIcon} />
      </div>

      <div className={styles.menu}>
        <ul className={styles.categoryList}>
          {allCategories.map((category) => (
            <li
              key={category._id}
              className={styles.categoryItem}
            >
              <div className={styles.categoryTitle} onClick={() => toggleSubMenu(category._id)}>
                <span>{category.title}</span>
                <LuChevronLeft className={`${styles.chevronIcon} ${activeCategory === category._id ? styles.rotate : ""}`} />
              </div>
              {/* فقط وقتی که activeCategory برابر با دسته‌بندی فعلی باشد، ساب منو نمایش داده می‌شود */}
              {activeCategory === category._id && (
                <ul className={styles.subMenuList}>
                  {category.subMenu.map((sub) => (
                    <li key={sub._id}>
                      <Link href="#" className={styles.subMenuItem}>
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
    </div>
  );
}
