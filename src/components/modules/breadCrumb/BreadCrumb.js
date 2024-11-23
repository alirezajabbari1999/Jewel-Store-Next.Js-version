import styles from "./breadCrumb.module.css";
import Link from "next/link";

export default function BreadCrumb({route}) {
  return (
    <div className={styles.breadCrumb}>
      <Link href="/" className={styles.link}>
        خانه
      </Link>
      <span>/</span>
      <p>{route}</p>
    </div>
  );
}
