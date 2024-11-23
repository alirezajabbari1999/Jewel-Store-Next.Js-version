"use client";
import { useState } from "react";
import styles from "./editProducts.module.css";
import Image from "next/image";
import swal from "sweetalert";
import { useRouter } from "next/navigation";

export default function EditProducts({ closeEditBox, product }) {
  const router = useRouter();
  const [editedProduct, setEditedProduct] = useState(product);

  const submitHandler = async () => {
    const updatedProduct = {
      id: editedProduct._id,
      name: editedProduct.name,
      price: editedProduct.price,
      count: editedProduct.count,
      color: editedProduct.color,
      weight: editedProduct.weight,
      ayaar: editedProduct.ayaar,
      type: editedProduct.type,
    };

    const res = await fetch("/api/product", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();

    if (res.status === 200) {
      swal({
        title: "اطلاعات محصول با موفقیت آپدیت شد",
        icon: "success",
        buttons: "متوجه شدم",
      });
      closeEditBox();
      router.refresh();
    } else {
      swal({
        title: "خطا در به‌روزرسانی محصول",
        icon: "warning",
        buttons: "متوجه شدم",
      });
    }
  };

  return (
    <div className={styles.editProducts}>
      <div className={styles.imageBox}>
        <Image
          src={product.img}
          alt=""
          width={100}
          height={100}
          className={styles.image}
        />
      </div>

      <div className={styles.row}>
        <p>نام محصول :</p>
        <input
          type="text"
          className={styles.input}
          value={editedProduct.name}
          onChange={(e) =>
            setEditedProduct({ ...editedProduct, name: e.target.value })
          }
        />
      </div>

      <div className={styles.row}>
        <p>قیمت :</p>
        <input
          type="text"
          className={styles.input}
          value={editedProduct.price}
          onChange={(e) =>
            setEditedProduct({ ...editedProduct, price: e.target.value })
          }
        />
      </div>

      <div className={styles.row}>
        <p>موجودی :</p>
        <input
          type="text"
          className={styles.input}
          value={editedProduct.count}
          onChange={(e) =>
            setEditedProduct({ ...editedProduct, count: e.target.value })
          }
        />
      </div>

      <div className={styles.row}>
        <p>رنگ :</p>
        <input
          type="text"
          className={styles.input}
          value={editedProduct.color}
          onChange={(e) =>
            setEditedProduct({ ...editedProduct, color: e.target.value })
          }
        />
      </div>

      <div className={styles.row}>
        <p>وزن :</p>
        <input
          type="text"
          className={styles.input}
          value={editedProduct.weight}
          onChange={(e) =>
            setEditedProduct({ ...editedProduct, weight: e.target.value })
          }
        />
      </div>

      <div className={styles.row}>
        <p>عیار :</p>
        <input
          type="text"
          className={styles.input}
          value={editedProduct.ayaar}
          onChange={(e) =>
            setEditedProduct({ ...editedProduct, ayaar: e.target.value })
          }
        />
      </div>

      <div className={styles.row}>
        <p>دسته بندی :</p>
        <input
          type="text"
          className={styles.input}
          value={editedProduct.type}
          onChange={(e) =>
            setEditedProduct({ ...editedProduct, type: e.target.value })
          }
        />
      </div>

      <div className={styles.btnBox}>
        <button className={styles.submitBtn} onClick={() => submitHandler()}>
          ثبت تغییرات
        </button>

        <button className={styles.closeBtn} onClick={closeEditBox}>
          لغو
        </button>
      </div>
    </div>
  );
}
