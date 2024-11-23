"use client";
import React, { useState } from "react";
import styles from "@/src/components/templates/p-admin/discounts/table.module.css";
import { useRouter } from "next/navigation";
import swal from "sweetalert";

export default function AddDiscount() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [percent, setPercent] = useState("");
  const [maxUse, setMaxUse] = useState("");
  // const [product, setProduct] = useState("");

  const AddDiscountHandler = async () => {
    if (!code) {
      swal({
        title: "لطفا شناسه تخفیف را وارد کنید",
        icon: "warning",
        buttons: "متوجه شدم",
      });
    }
    if (!percent) {
      swal({
        title: "لطفا درصد تخفیف را وارد کنید",
        icon: "warning",
        buttons: "متوجه شدم",
      });
    }
    if (!maxUse) {
      swal({
        title: "لطفا حداکثر میزان استفاده از کد تخفیف را وارد کنید",
        icon: "warning",
        buttons: "متوجه شدم",
      });
    }

    const res = await fetch("/api/p-admin/discounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, percent, maxUse }),
    });
    if (res.status === 201) {
      swal({
        title: "کد تخفیف با موفقیت ایجاد شد",
        icon: "success",
        buttons: "متوجه شدم",
      }).then((result) => {
        router.refresh();
        setCode(""), setPercent(""), setMaxUse("");
      });
    }
  };

  return (
    <div>
      <section className={styles.discount}>
        <p>افزودن کد تخفیف جدید</p>
        <div className={styles.discount_main}>
          <div>
            <label>شناسه تخفیف</label>
            <input
              placeholder="لطفا شناسه تخفیف را وارد کنید"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <div>
            <label>درصد تخفیف</label>
            <input
              placeholder="لطفا درصد تخفیف را وارد کنید"
              type="text"
              value={percent}
              onChange={(e) => setPercent(e.target.value)}
            />
          </div>
          <div>
            <label>حداکثر استفاده</label>
            <input
              placeholder="حداکثر استفاده از کد تخفیف"
              type="text"
              value={maxUse}
              onChange={(e) => setMaxUse(e.target.value)}
            />
          </div>
          {/* <div>
            <label>محصول</label>
            <select
              name=""
              id=""
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="">قهوه ترک</option>
              <option value="">قهوه عربیکا</option>
              <option value="">قهوه اسپرسو</option>
            </select>
          </div> */}
        </div>
        <button onClick={AddDiscountHandler}>افزودن</button>
      </section>
    </div>
  );
}
