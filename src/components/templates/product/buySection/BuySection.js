import styles from "./buySection..module.css";
import { BiStoreAlt } from "react-icons/bi";
import { PiSquareHalfBottom } from "react-icons/pi";

export default function BuySection({product}) {
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
        <div className={styles.price}>{product.price.toLocaleString()} تومان</div>
        <div className={styles.updateInfo}>بروزرسانی قیمت: 28 اسفند 1401</div>
        <div className={styles.btns}>
          <div className={styles.counter}>
            <button className={styles.plus}>+</button>
            <span className={styles.count}>1</span>
            <button className={styles.mines}>-</button>
          </div>
          <div className={styles.shopCardBtn}>افزودن به سبد خرید</div>
        </div>
      </div>
    </div>
  );
}
