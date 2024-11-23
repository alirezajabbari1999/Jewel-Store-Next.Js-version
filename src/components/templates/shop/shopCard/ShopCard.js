import styles from "./shopCard.module.css";
import { MdLocalGroceryStore } from "react-icons/md";
import { MdOutlineInventory } from "react-icons/md";
import Image from "next/image";
import img from "@/public/images/handart1.png";

export default function ShopCard({product}) {
  return (
    <div className={styles.shopCard}>
      <div className={styles.imageBox}>
        <Image src={product.img} alt="product image" className={styles.image} width={200} height={200}/>
      </div>

      <span className={styles.title}>{product.name}</span>

      <div className={styles.mojodiRow}>
        <p className={styles.mojodi}>
          <MdOutlineInventory className={styles.mojodiIcon} />
          <span>
            <span>{product.count} </span> 
            عدد در انبار
          </span>
        </p>
      </div>

      <div className={styles.priceRow}>
        <span className={styles.price}>{product.price.toLocaleString()}</span> تومان
      </div>

      <span className={styles.basketContainer}>
        <MdLocalGroceryStore className={styles.basketIcon} />
      </span>
    </div>
  );
}
