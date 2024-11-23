import styles from "./accessoryPorbazdidPart.module.css";
import Link from "next/link";
import Image from "next/image";

export default function AccessoryPorbazdidPart({ img, name, price }) {
  return (
    <div>
      <Link href="">
        <div className={styles.porbazdidPartContainer}>
          <div className={styles.right}>
            <Image
              src={img}
              alt="Image"
              className={styles.image}
              width={200}
              height={200}
            />
          </div>

          <div className={styles.left}>
            <span className={styles.title}>{name}</span>
            <span>{price.toLocaleString()} تومان</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
