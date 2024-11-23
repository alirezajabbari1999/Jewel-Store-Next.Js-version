"use client";
import styles from "./product.module.css";
import Link from "next/link";
import { FaStar, FaRegStar } from "react-icons/fa";
import swal from "sweetalert";
import Image from "next/image";

const Card = ({ price, name, productID, image }) => {
  const removeProduct = () => {
    swal({
      title: "آیا از حذف محصول اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      // کاربر اگه روی نه کلیک کنه مقدار نال برمیگرده و اگر روی آره مقدار تورو
      // بنابراین زمانیکه روی آره کلیک میکنه ما یک مقدار دریافت میکنیم و اینه یعنی
      // ریزالت وجود داره
      if (result) {
        const res = await fetch(`/api/wishlist/${productID}`, {
          method: "DELETE",
        });
        if (res.status === 200) {
          swal({
            title: "با موفقیت از علاقمندی ها حذف شد",
            icon: "success",
            buttons: "متوجه شدم",
          }).then(() => {
            location.reload();
          });
        }
      }
    });
  };

  return (
    <div className={styles.card}>
      <Link href={"/product/123"}>
        <Image src={image} alt="wishlist image" width={300} height={300} className={styles.image}/>
      </Link>
      <p dir="rtl" className={styles.title}>{name}</p>
      <div>
        <div>
          {new Array(5).fill(0).map((item, index) => (
            <FaStar key={`star-${index}`} />
          ))}
          {/* {new Array(5 - score).fill(0).map((item, index) => (
            <FaRegStar key={`empty-star-${index}`} />
          ))} */}
        </div>
        <span>{price.toLocaleString()} تومان</span>
      </div>
      <button onClick={removeProduct} className={styles.delete_btn}>
        حذف محصول{" "}
      </button>
    </div>
  );
};

export default Card;
