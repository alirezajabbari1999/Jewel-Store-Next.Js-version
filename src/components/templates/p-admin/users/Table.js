"use client";
import React, { useState, useEffect } from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import EditModal from "@/src/components/templates/p-admin/users/EditModal";

export default function DataTable({ title, users }) {
  const router = useRouter();
  const [bannedUsers, setBannedUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // توی این استیت اطلاعات کاربری که قرار با دکمه ویرایش آپدیتش کنیم نگهداری میشه
  const [selectedUser, setSelectedUser] = useState(null);

  const changeRoleHandler = async (userId) => {
    const response = await fetch("/api/p-admin/user/role", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (response.status === 200) {
      swal({
        title: "نقش کاربر با موفقیت تغییر کرد",
        icon: "success",
        buttons: "متوجه شدم",
      }).then(() => {
        router.refresh();
      });
    }
  };

  const removeUserHandler = async (userId) => {
    swal({
      title: "آیا از حذف کاربر اطمینان دارین؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch("/api/p-admin/user/remove", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });

        if (res.status === 200) {
          swal({
            title: "کاربر مورد نظر با موفقیت حذف شد",
            icon: "success",
            buttons: "فهمیدم",
          }).then(() => {
            router.refresh();
          });
        }
      }
    });
  };

  const bannUserHandler = async (email, phone) => {
    swal({
      title: "آیا از بن کردن کاربر اطمینان دارین؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch("/api/p-admin/user/ban", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, phone }),
        });

        if (res.status === 201) {
          swal({
            title: "کاربر مورد نظر با موفقیت بن شد",
            icon: "success",
            buttons: "فهمیدم",
          }).then(() => {
            // مقدار استیت کاربران بن شده رو آپدیت کردیم یجورایی که تغییرات بصورت ریل تایم نمایش داده شه
            setBannedUsers((prev) => [...prev, { email, phone }]);
          });
        }
      }
    });
  };

  // درريافت كل كاربران بن شده و ذخيره آنها در استيت
  useEffect(() => {
    const getAllBanUsers = async () => {
      const res = await fetch("/api/p-admin/user/ban");
      const data = await res.json();
      setBannedUsers(data.BanUsers);
    };
    getAllBanUsers();
  }, []);

  const isUserBanned = (email) => {
    return bannedUsers.some((user) => user.email === email);
  };

  const openEditModalHandler = (user) => {
    setIsModalOpen(true);
    setSelectedUser(user)
  };
  const closeModalHandler = () => {
    setIsModalOpen(false);
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
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
              <th>نقش</th>
              <th>ویرایش</th>
              <th>تغییر سطح</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email ? user.email : "ایمیل یافت نشد"}</td>
                <td>{user.role === "USER" ? "کاربر عادی" : "مدیر"}</td>
                <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => openEditModalHandler(user)}
                  >
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => changeRoleHandler(user._id)}
                  >
                    تغییر نقش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.delete_btn}
                    onClick={() => removeUserHandler(user._id)}
                  >
                    حذف
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.delete_btn}
                    onClick={() => bannUserHandler(user.email, user.phone)}
                    disabled={isUserBanned(user.email)}
                  >
                    {isUserBanned(user.email) ? "بن شده" : "بن"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && <EditModal closeModal={closeModalHandler} selectedUser={selectedUser} />}
    </div>
  );
}
