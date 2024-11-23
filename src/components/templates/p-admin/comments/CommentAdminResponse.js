"use client";
import { useState } from "react";
import styles from "./commentAdminResponse.module.css";
import swal from "sweetalert";

export default function CommentAdminResponse({ closeResponseModal, comment }) {
  const [adminResponse, setAdminResponse] = useState("");

  const submitHandler = async () => {
    const adminAnswer = {
      ...comment,
      body: adminResponse,
      replyTo: comment._id,
    };

    const res = await fetch("/api/p-admin/comments/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adminAnswer),
    });
    if (res.status === 201) {
      swal({
        title: "پاسخ با موفقیت ثبت شد",
        icon: "success",
        buttons: "متوجه شدم",
      });
      closeResponseModal()
    }
  };

  return (
    <div className={styles.adminResponse}>
      <p className={styles.header}>لطفا پاسخ خود را تایپ کنید :</p>
      <textarea
        rows={10}
        cols={30}
        value={adminResponse}
        onChange={(e) => setAdminResponse(e.target.value)}
        className={styles.textArea}
      ></textarea>

      <div className={styles.btnBox}>
        <button className={styles.submitBtn} onClick={submitHandler}>
          ثبت پاسخ
        </button>
        <button className={styles.closeBtn} onClick={closeResponseModal}>
          لغو
        </button>
      </div>
    </div>
  );
}
