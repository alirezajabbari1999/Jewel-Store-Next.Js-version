import styles from "./moreProduct.module.css";
import Link from "next/link";
import Image from "next/image";
// import img from "@/public/images/handart1.png";

export default function MoreProduct({ name, price, img }) {
  return (
    <div className={styles.handArtSliderPart}>
      <div className={styles.handArtLink}>
        <Link href="" className={styles.link}>
          <div className={styles.imageBox}>
            <Image
              className={styles.image}
              src={img}
              alt="Accessory Gardanband section image"
              width={200}
              height={200}
            />
          </div>

          <div className={styles.info}>
            <div className={styles.title}>{name}</div>
            <div className={styles.price}>{price.toLocaleString()} تومان</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
