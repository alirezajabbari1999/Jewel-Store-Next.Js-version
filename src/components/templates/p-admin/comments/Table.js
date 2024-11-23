"use client";
import React, { useState } from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import CommentEdit from "./CommentEdit";
import CommentAdminResponse from "./CommentAdminResponse";

export default function DataTable({ comments, title }) {
  const router = useRouter();
  const [isOpenCommentEditModal, setIsOpenCommentEditModal] = useState(false);
  // کامنتی که میخوام ادیت کنم رو ریختم تو این استیت
  const [editComment, setEditComment] = useState();
  const [isOpenAdminResponseModal, setIsOpenAdminResponseModal] =
    useState(false);
  const [commentForResponse, setCommentForResponse] = useState(null);

  const showCommentBody = (body) => {
    swal({
      title: body,
      icon: undefined,
      buttons: "متوجه شدم",
    });
  };

  const acceptCommentHandler = async (commentId) => {
    const res = await fetch("/api/p-admin/comments/accept", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentId }),
    });
    if (res.status === 200) {
      const data = await res.json();
      const message = data.acceptComment.isAccept
        ? "کامنت با موفقیت رد شد"
        : "کامنت با موفقیت تایید شد";

      swal({
        title: message,
        icon: data.acceptComment.isAccept ? "warning" : "success",
        buttons: "متوجه شدم",
      }).then((result) => {
        router.refresh();
      });
    }
  };

  const deleteCommentHandler = async (commentId) => {
    const confirm = await swal({
      title: "آیا از حذف این کامنت اطمینان دارید؟",
      icon: "warning",
      buttons: ["لغو", "حذف"],
    });

    if (confirm) {
      const res = await fetch(`/api/p-admin/comments/${commentId}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        swal({
          title: "کامنت با موفقیت حذف شد",
          icon: "success",
          buttons: "متوجه شدم",
        }).then(() => {
          router.refresh();
        });
      } else {
        swal({
          title: "خطا در حذف کامنت",
          icon: "error",
          buttons: "متوجه شدم",
        });
      }
    }
  };

  const openEditModalHandler = (comment) => {
    setIsOpenCommentEditModal(true);
    setEditComment(comment);
  };

  const closeEditModalHandler = () => {
    setIsOpenCommentEditModal(false);
  };

  const openAdminResponseHandler = (comment) => {
    setIsOpenAdminResponseModal(true);
    setCommentForResponse(comment);
  };

  const closeAdminResponseHandler = () => {
    setIsOpenAdminResponseModal(false);
  };

  return (
    <div>
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
              <th>کاربر</th>
              <th>ایمیل</th>
              <th>امتیاز کاربر</th>
              <th>محصول</th>
              <th>تاریخ ثبت</th>
              <th>مشاهده</th>
              <th>ویرایش</th>
              <th>حذف</th>
              <th>تایید</th>
              <th>پاسخ</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>

            {comments
              .filter((comment) => !comment.replyTo) // فقط کامنت‌هایی که replyTo ندارند
              .map((comment, index) => (
                <tr key={comment._id}>
                  <td
                    style={{
                      backgroundColor: comment.isAccept ? "green" : "red",
                      color: "white",
                    }}
                  >
                    {index + 1}
                  </td>
                  <td>{comment.username}</td>
                  <td>{comment.email}</td>
                  <td>{comment.score}</td>
                  <td>{comment.productID?.name}</td>
                  <td>{new Date(comment.date).toLocaleDateString("fa-IR")}</td>
                  <td>
                    <button
                      type="button"
                      className={styles.edit_btn}
                      onClick={() => showCommentBody(comment.body)}
                    >
                      مشاهده
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={styles.edit_btn}
                      onClick={() => openEditModalHandler(comment)}
                    >
                      ویرایش
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={styles.delete_btn}
                      onClick={() => deleteCommentHandler(comment._id)}
                    >
                      حذف
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={styles.delete_btn}
                      onClick={() => acceptCommentHandler(comment._id)}
                    >
                      {comment.isAccept ? "رد کردن" : "تایید"}
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={styles.delete_btn}
                      onClick={() => openAdminResponseHandler(comment)}
                    >
                      پاسخ
                    </button>
                  </td>
                  <td>
                    <button type="button" className={styles.delete_btn}>
                      بن
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {isOpenCommentEditModal ? (
        <CommentEdit
          closeEditModal={closeEditModalHandler}
          comment={editComment}
        />
      ) : (
        ""
      )}

      {isOpenAdminResponseModal ? (
        <CommentAdminResponse
          closeResponseModal={closeAdminResponseHandler}
          comment={commentForResponse}
        />
      ) : (
        ""
      )}

      <div
        className={`overly ${
          isOpenCommentEditModal || isOpenAdminResponseModal ? "active" : ""
        }`}
      ></div>
    </div>
  );
}
