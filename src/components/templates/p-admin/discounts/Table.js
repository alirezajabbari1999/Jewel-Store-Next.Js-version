"use client";
import React from "react";
import styles from "./table.module.css";
import swal from "sweetalert";
import { useRouter } from "next/navigation";

function Table({ discounts }) {
  const router = useRouter();

  const deleteDiscountHandler = async ({ discountId }) => {
    const confirm = await swal({
      title: "آیا از حذف کد تخفیف اطمينان داريد",
      icon: "warning",
      buttons: ["لغو", "حذف"],
    });

    if (confirm) {
      const res = await fetch(`/api/p-admin/discounts/delete/${discountId}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        await swal({
          title: "کد تخفیف با موفقیت حذف شد",
          icon: "success",
          buttons: "متوجه شدم",
        });
        router.refresh();
      }
    }
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>شناسه</th>
          <th>کد</th>
          <th>درصد</th>
          <th>حداکثر استفاده</th>
          <th>دفعات استفاده شده</th>
          <th>حذف</th>
        </tr>
      </thead>
      <tbody>
        {discounts.map((discount, index) => (
          <tr key={discount._id}>
            <td
              style={{
                backgroundColor:
                  discount.maxUse == discount.uses ? "red" : "green",
                color: "white",
              }}
            >
              {index + 1}
            </td>
            <td>{discount.code}</td>
            <td>{discount.percent}</td>
            <td>{discount.maxUse}</td>
            <td>{discount.uses}</td>
            <td>
              <button
                type="button"
                className={styles.delete_btn}
                onClick={(e) => deleteDiscountHandler(discount._id)}
              >
                حذف
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
