"use client";
import React, { useState } from "react";
import styles from "@/src/components/templates/p-admin/users/editModal.module.css";
import { useRouter } from "next/navigation";
import swal from "sweetalert";

export default function EditModal({ closeModal, selectedUser }) {
  const router = useRouter();
  const [editedUser, setEditedUser] = useState(selectedUser);

  const editUserHandler = async () => {
    const newUserInfo = {
      userId: editedUser._id,
      name: editedUser.username,
      email: editedUser.email,
      phone: editedUser.phone,
    };

    const res = await fetch("/api/p-admin/user/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserInfo),
    });
    if (res.status === 200) {
      swal({
        title: "اطلاعات كاربر با موفقيت آپديت شد",
        icon: "success",
        buttons: "متوجه شدم",
      });
      closeModal();
      router.refresh();
    }
    if (res.status === 401) {
      swal({
        title: "فرمت ايميل معتبر نيست",
        icon: "warning",
        buttons: "متوجه شدم",
      });
    }
    if (res.status === 402) {
      swal({
        title: "شماره تلفن معتبر نيست",
        icon: "warning",
        buttons: "متوجه شدم",
      });
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <h2>ویرایش کاربر</h2>
        <input
          type="text"
          value={editedUser.username}
          onChange={(e) =>
            setEditedUser({ ...editedUser, name: e.target.value })
          }
          placeholder="نام"
        />
        <input
          type="email"
          value={editedUser.email}
          onChange={(e) =>
            setEditedUser({ ...editedUser, email: e.target.value })
          }
          placeholder="ایمیل"
        />
        <input
          type="text"
          value={editedUser.phone || ""}
          onChange={(e) =>
            setEditedUser({ ...editedUser, phone: e.target.value })
          }
          placeholder="شماره تلفن"
        />
        <div className={styles.buttons}>
          <button onClick={editUserHandler}>ذخیره</button>
          <button onClick={closeModal}>بستن</button>
        </div>
      </div>
    </div>
  );
}
