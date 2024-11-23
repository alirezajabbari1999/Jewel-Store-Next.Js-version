import styles from "./valentineAccessoryPart.module.css";
import Image from "next/image";

export default function ValentineAccessoryPart({img}) {
  return (
    <div className={styles.valentinePartContainer}>
      <Image src={img} alt="image of valentine section" className={styles.image} width={200} height={200}/>
    </div>
  );
}
