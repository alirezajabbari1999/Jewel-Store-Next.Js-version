"use client";
import React, { useState } from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import ProductDetails from "./ProductDetails";
import EditProducts from "./EditProducts";

export default function DataTable({ products, title }) {
  const router = useRouter();
  const [isOpenDetailsBox, setIsOpenDetailsBox] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [isOpenEditBox, setIsOpenEditBox] = useState(false);

  const deleteProductHandler = async (productId) => {
    const confirm = await swal({
      title: "آیا از حذف محصول اطمينان داريد",
      icon: "warning",
      buttons: ["لغو", "حذف"],
    });

    if (confirm) {
      const res = await fetch(`/api/product/${productId}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        swal({
          title: "محصول با موفقيت حذف شد",
          icon: "success",
          buttons: "باشه",
        });
        router.refresh();
      } else {
        swal({
          title: "خطایی رخ داد",
          text: "لطفا دوباره تلاش کنید",
          icon: "error",
          buttons: "باشه",
        });
      }
    }
  };

  const openDetailsHandler = (product) => {
    setSelectedProduct(product);
    setIsOpenDetailsBox(true);
  };

  const openEditHandler = (product) => {
    setSelectedProduct(product);
    setIsOpenEditBox(true);
  };

  return (
    <div className={styles.productsTable}>
      <div>
        <h1 className={styles.title}>
          <span>{title}</span>
        </h1>
      </div>
      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام محصول</th>
              <th>قیمت</th>
              <th>امتیاز</th>
              <th>مشاهده جزییات</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.price.toLocaleString()}</td>
                <td>{product.score}</td>

                <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => openDetailsHandler(product)}
                  >
                    مشاهده جزییات
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => openEditHandler(product)}
                  >
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.delete_btn}
                    onClick={() => deleteProductHandler(product._id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isOpenDetailsBox ? (
        <ProductDetails
          closeDetailsBox={() => setIsOpenDetailsBox(false)}
          product={selectedProduct}
        />
      ) : (
        ""
      )}

      {isOpenEditBox ? (
        <EditProducts
          closeEditBox={() => setIsOpenEditBox(false)}
          product={selectedProduct}
        />
      ) : (
        ""
      )}


      <div className={`overly ${(isOpenDetailsBox || isOpenEditBox) ? "active" : ""}`}></div>

    </div>
  );
}
