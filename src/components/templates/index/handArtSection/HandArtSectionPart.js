import styles from "./handArtSectionPart.module.css";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import Image from "next/image";

export default function HandArtSectionPart({_id, name, price, img }) {
  return (
    <div className={styles.handArtSliderPart}>
      <div className={styles.handArtLink}>
        <Link href={`/product/${_id}`} className={styles.link}>
          <div className={styles.imageBox}>
            <Image
              src={img}
              alt="Hand art slider image"
              className={styles.image}
              width={200}
              height={200}
            />
          </div>

          <div className="info">
            <div className={styles.title}>{name}</div>
            <div className={styles.price}>{price.toLocaleString()} تومان</div>
          </div>
        </Link>

        <div className={styles.icons}>
          <div className={styles.rightIcons}>
            <AiOutlineShoppingCart className={styles.shoppingCard} />
            <IoIosHeartEmpty className={styles.heartIcon} />
          </div>
          <div className={styles.rate}>
            <span className={styles.rateNumber}>5</span>
            <FaStar className={styles.starIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}
