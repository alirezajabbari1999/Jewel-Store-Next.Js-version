import Image from "next/image";
import Link from "next/link";
import styles from "./product.module.css";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function Product({
  name,
  price,
  count,
  image,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  return (
    <div className={styles.product}>
      <div className={styles.right}>
        <div className={styles.imageBox}>
          <Link href="">
            <Image
              src={image}
              alt="product image"
              className={styles.image}
              width={250}
              height={250}
            />
          </Link>
        </div>

        <div className={styles.titleBox}>
          <p className={styles.productName}>{name}</p>
          <div className={styles.btnBox}>
            <div className={styles.counter}>
              <span className={styles.counterBtn} onClick={onIncrease}>+</span>
              <span>{count}</span>
              <span className={styles.counterBtn} onClick={onDecrease}>-</span>
            </div>
            <div className={styles.deleteBtnBox} onClick={onRemove}>
              <RiDeleteBin5Line />
              <button className={styles.deleteBtn}>حذف</button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.left}>
        <div className={styles.priceBox}>
          <span className={styles.gheymatVahed}>قیمت واحد :</span>
          <span className={styles.gheymatVahed}>
            {price.toLocaleString()} <span className={styles.toman}>تومان</span>
          </span>
        </div>

        <div className={styles.priceBox}>
          <span>مجموع :</span>
          <span>
            {(price * count).toLocaleString()}{" "}
            <span className={styles.toman}>تومان</span>
          </span>
        </div>
      </div>
    </div>
  );
}
