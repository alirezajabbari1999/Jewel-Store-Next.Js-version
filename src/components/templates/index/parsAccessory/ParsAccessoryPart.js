import styles from "./parsAccessoryPart.module.css";
import Image from "next/image";
import img from "@/public/images/handart1.png";

export default function ParsAccessoryPart() {
  return (
    <div className={styles.parsAccessoryPartContainer}>
      <div className={styles.imageBox}>
        <Image src={img} alt="Pars accessory image" className={styles.image} />
      </div>

      <div className={styles.title}>دستبند و اکسسوری</div>
    </div>
  );
}
