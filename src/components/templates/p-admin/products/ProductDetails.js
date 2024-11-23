"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./productDetails.module.css";

export default function ProductDetails({ closeDetailsBox, product }) {
  return (
    <div className={styles.ProductDetails}>
      <div className={styles.imageBox}>
        <Image src={product.img} alt="" width={100} height={100}  className={styles.image}/>
      </div>

      <div className={styles.row}>
        <p>نام محصول :</p>
        <p>{product.name}</p>
      </div>

      <div className={styles.row}>
        <p>قیمت :</p>
        <p>{product.price.toLocaleString()} تومان</p>
      </div>

      <div className={styles.row}>
        <p>موجودی :</p>
        <p>{product.count} عدد</p>
      </div>

      <div className={styles.row}>
        <p>رنگ :</p>
        <p>{product.color}</p>
      </div>

      <div className={styles.row}>
        <p>وزن :</p>
        <p>{product.weight} گرم</p>
      </div>

      <div className={styles.row}>
        <p>عیار :</p>
        <p>{product.ayaar}</p>
      </div>

      <div className={styles.row}>
        <p>دسته بندی :</p>
        <p>{product.type}</p>
      </div>

      <div className={styles.btnBox}>
        <button className={styles.closeBtn} onClick={closeDetailsBox}>
          بستن
        </button>
      </div>
    </div>
  );
}
