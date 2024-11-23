import styles from "./description.module.css";

export default function Description({ product }) {
  return (
    <div data-aos="fade-up">
      <hr />
      <main className={styles.description}>
        <div className={styles.item}>
          <p>نوع محصول</p>
          <p>{product.type}</p>
        </div>
        <div className={styles.item}>
          <p>رنگ طلا</p>
          <p>{product.color}</p>
        </div>
        <div className={styles.item}>
          <p>وزن</p>
          <p>{product.weight} گرم</p>
        </div>
        <div className={styles.item}>
          <p>عیار طلا</p>
          <p>{product.ayaar} عیار</p>
        </div>
      </main>
    </div>
  );
}
