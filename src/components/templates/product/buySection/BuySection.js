"use client";
import { useState } from "react";
import styles from "./buySection.module.css";
import { BiStoreAlt } from "react-icons/bi";
import { PiSquareHalfBottom } from "react-icons/pi";
import swal from "sweetalert";

export default function BuySection({ product }) {
  const [count, setCount] = useState(1);

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const isProductIn = cart.findIndex((item) => item.id === product._id);

    if (isProductIn !== -1) {
      cart[isProductIn].count = count;
      swal({
        title: "تعداد محصول مورد نظر با موفقیت در سبد خرید به‌روزرسانی شد",
        icon: "success",
        buttons: "متوجه شدم",
      });
    } else {
      const cartItem = {
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.img,
        count,
      };
      cart.push(cartItem);
      swal({
        title: "محصول با موفقیت به سبد خرید افزوده شد",
        icon: "success",
        buttons: "متوجه شدم",
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // ارسال رویداد برای همگام‌سازی
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className={styles.infoSide} data-aos="fade-up">
      <div className={styles.infoBox}>
        <div className={styles.headerBox}>
          <BiStoreAlt className={styles.storeIcon} />
          <div className={styles.header}>فروشگاه طلا و جواهرات</div>
        </div>
        <div className={styles.mojodiBox}>
          <PiSquareHalfBottom className={styles.shopIcon} />
          <span className={styles.mojodi}>{product.count} عدد در انبار</span>
        </div>
        <div className={styles.ersal}>
          <div className={styles.redCircle}></div>
          <span className={styles.ersalText}>
            ارسال توسط فروشگاه طلا و جواهرات پارس کالا
          </span>
        </div>
        <div className={styles.price}>
          {product.price.toLocaleString()} تومان
        </div>
        <div className={styles.updateInfo}>بروزرسانی قیمت: 28 اسفند 1401</div>
        <div className={styles.btns}>
          <div className={styles.counter}>
            <button className={styles.plus} onClick={handleIncrement}>
              +
            </button>
            <span className={styles.count}>{count}</span>
            <button className={styles.mines} onClick={handleDecrement}>
              -
            </button>
          </div>
          <div className={styles.shopCardBtn} onClick={addToCart}>
            افزودن به سبد خرید
          </div>
        </div>
      </div>
    </div>
  );
}
