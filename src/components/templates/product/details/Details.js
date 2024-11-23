"use client";
import { useState, useEffect } from "react";
import styles from "./details.module.css";
import { FaStar } from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import { FaHeart } from "react-icons/fa6";

export default function Details({ product }) {
  const [user, setUser] = useState({});
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const authUser = async () => {
      const res = await fetch("/api/auth/me");
      if (res.status === 200) {
        const data = await res.json();
        setUser({ ...data });
      }
    };
    authUser();
  }, []);

  const addToWishlist = async () => {
    if (!user?._id) {
      return swal({
        title: "برای افزودن به علاقمندی ها ابتدا لاگین شوید",
        icon: "error",
        buttons: "متوجه شدم",
      });
    } else {
      const wish = {
        user: user._id,
        product: product._id,
      };

      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wish),
      });
      if (res.status === 201) {
        swal({
          title: "کالای مورد نظر با موفقیت به علاقمندی ها افزوده شد",
          icon: "success",
          buttons: "متوجه شدم",
        });
        setIsInWishlist((prev) => (prev = !prev));
      }
    }
  };

  return (
    <div data-aos="fade-up">
      <div className={styles.titleSide}>
        <h3 className={styles.title}>{product.name}</h3>
      </div>
      <div className={styles.rateContainer}>
        <div className={styles.rateBox}>
          <div className={styles.rate}>
            <span>
              <FaStar className={styles.starIcon} />
            </span>
            <span>5</span>
          </div>
          <span className={styles.rateText}>از 5 رای</span>
        </div>
      </div>
      <div className={styles.wishListBox} onClick={addToWishlist}>
        {isInWishlist ? (
          <>
            <FaHeart className={styles.heartIconActive} />
            افزوده شد به علاقمندی ها
          </>
        ) : (
          <>
            <GoHeart className={styles.heartIcon} />
            افزودن به علاقمندی ها
          </>
        )}
      </div>
    </div>
  );
}
