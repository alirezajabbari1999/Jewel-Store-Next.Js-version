import styles from "./product.module.css";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import Image from "next/image";

export default function Product({_id, name, price, img }) {
  return (
    <div className={styles.handArtSliderPart}>
      <div className={styles.handArtLink}>
        <Link href={`/product/${_id}`} className={styles.link}>
          <div className={styles.imageBox}>
            {img ? (
              <Image
                className={styles.image}
                src={img}
                alt={name || "Product image"}
                width={200}
                height={200}
              />
            ) : (
              <div className={styles.placeholder}>تصویر در دسترس نیست</div>
            )}
          </div>

          <div className={styles.info}>
            <div className={styles.title}>{name}</div>
            <div className={styles.price}>
              {price ? price.toLocaleString() : "قیمت در دسترس نیست"} تومان
            </div>
          </div>
        </Link>

        <div className={styles.icons}>
          <div className={styles.right}>
            <AiOutlineShoppingCart className={styles.shoppingCard} />
            <IoIosHeartEmpty className={styles.heartIcon} />
          </div>

          <div className={styles.left}>
            <span className={styles.rate}>
              <span className={styles.rateNumber}>5</span>
              <FaStar className={styles.starIcon} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
