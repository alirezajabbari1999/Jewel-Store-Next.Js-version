"use client";
import { useState } from "react";
import styles from "./commentEdit.module.css";
import swal from "sweetalert";
import { useRouter } from "next/navigation";

export default function CommentEdit({ closeEditModal, comment }) {
  const router = useRouter();
  const [newCommentText, setNewCommentText] = useState(comment.body);

  const submitHandler = async () => {
    const res = await fetch("/api/p-admin/comments/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: comment._id, body: newCommentText }),
    });
    if (res.status === 200) {
      swal({
        title: "کامنت با موفقیت آپدیت شد",
        icon: "success",
        buttons: "متوجه شدم",
      });
      closeEditModal();
      router.refresh();
    }
    if (res.status === 500) {
      swal({
        title: "خطا در ویرایش کامنت",
        icon: "warning",
        buttons: "متوجه شدم",
      });
    }
  };

  return (
    <div className={styles.commentEdit}>
      <div className={styles.row}>
        <p>کاربر :</p>
        <p>{comment.user.username}</p>
      </div>

      <div className={styles.row}>
        <p>محصول :</p>
        <p>{comment.productID.name}</p>
      </div>

      <div className={styles.textAreaBox}>
        <p>متن کامنت :</p>
        <textarea
          rows={10}
          cols={30}
          className={styles.textArea}
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
        ></textarea>
      </div>

      <div className={styles.btnBox}>
        <button className={styles.submitBtn} onClick={submitHandler}>
          ویرایش
        </button>
        <button className={styles.closeBtn} onClick={closeEditModal}>
          بستن
        </button>
      </div>
    </div>
  );
}
