"use client";
import React, { useState } from "react";
import styles from "./table.module.css";
import swal from "sweetalert";
import { useRouter } from "next/navigation";

function AddProduct() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [count, setCount] = useState("");
  const [color, setColor] = useState("");
  const [weight, setWeight] = useState("");
  const [ayaar, setAyaar] = useState("");
  const [type, setType] = useState("");
  const [img, setImg] = useState({});

  const addProduct = async () => {

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("count", count);
    formData.append("color", color);
    formData.append("weight", weight);
    formData.append("ayaar", ayaar);
    formData.append("type", type);
    formData.append("img", img);

    const res = await fetch("/api/product", {
      method: "POST",
      body: formData,
    });

    if (res.status === 201) {
      swal({
        title: "محصول مورد نظر با موفقیت ایجاد شد",
        icon: "success",
        buttons: "فهمیدم",
      }).then(() => {
        router.refresh();
      });
    }
  };
  return (
    <section className={styles.discount}>
      <p>افزودن محصول جدید</p>
      <div className={styles.discount_main}>
        <div>
          <label>نام محصول</label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
          />
        </div>
        <div>
          <label>مبلغ محصول</label>
          <input
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            type="text"
          />
        </div>

        <div>
          <label>موجودی در انبار</label>
          <input
            value={count}
            onChange={(event) => setCount(event.target.value)}
            type="text"
          />
        </div>
        <div>
          <label>رنگ</label>
          <input
            value={color}
            onChange={(event) => setColor(event.target.value)}
            type="text"
          />
        </div>
        <div>
          <label>وزن</label>
          <input
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
            type="text"
          />
        </div>
        <div>
          <label>عیار</label>
          <input
            value={ayaar}
            onChange={(event) => setAyaar(event.target.value)}
            type="text"
          />
        </div>
        <div>
          <label>دسته بندی</label>
          <input
            value={type}
            onChange={(event) => setType(event.target.value)}
            type="text"
          />
        </div>
        <div>
          <label>تصویر محصول</label>
          <input
            onChange={(event) => setImg(event.target.files[0])}
            type="file"
          />
        </div>
      </div>
      <button onClick={addProduct}>افزودن</button>
    </section>
  );
}

export default AddProduct;
