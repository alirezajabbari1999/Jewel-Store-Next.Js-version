"use client";
import React, { useState, useEffect } from "react";
import styles from "@/src/styles/p-user/accountDetails.module.css";
import swal from "sweetalert";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import Image from "next/image";

function AccountDetails() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");

  // اينجا اطلاعات كاربری رو كه لاگين هست گرفتيم و در اینپوت ها نمایش دادیم
  // یعنی کاربر که وارد صفحه شد اطلاعات خودش رو در اینپوت ها میبینه
  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("/api/auth/me");
      const data = await res.json();

      setName(data.username);
      setEmail(data.email);
      setPhone(data.phone);
      setImage(data.image);
      setPassword(data.password);
    };
    getUser();
  }, []);

  const updateUser = async () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      swal({
        title: "پرکردن تمام اینپوت ها ضروری است",
        icon: "warning",
        buttons: "متوجه شدم",
      });
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("image", image);

    const res = await fetch("/api/updateUser", {
      method: "POST",
      body: formData,
    });

    if (res.status === 200) {
      // در صورت موفقیت آمیز بودن آپدیت اطلاعات کاربر کاربر لاگ اوت میشه و به صفحه لاگین منتقل میشه
      swal({
        title: "اطلاعات مورد نظر با موفقیت آپدیت شد",
        icon: "success",
        buttons: "متوجه شدم",
      }).then(async (result) => {
        await fetch("/api/auth/signout", { method: "POST" });
        location.replace("/register");
      });
    }
  };

  return (
    <main>
      <div className={styles.details}>
        <h1 className={styles.title}>
          <span> جزئیات اکانت</span>
        </h1>
        <div className={styles.details_main}>
          <section>
            <div>
              <label>نام کاربری</label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="لطفا نام کاربری خود را وارد کنید"
                type="text"
              />
            </div>
            <div>
              <label>ایمیل</label>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="لطفا ایمیل خود را وارد کنید"
                type="text"
              />
            </div>
            <div>
              <label>شماره تماس</label>
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="لطفا شماره تماس خود را وارد کنید"
                type="number"
              />
            </div>
          </section>
          <section>
            <div className={styles.uploader}>
              <Image
                src={image && image !== "" ? image : "/images/noImageUser.webp"}
                alt="Profile Image"
                width={150}
                height={150}
              />
              <div>
                <div>
                  <button>
                    <IoCloudUploadOutline />
                    تغییر
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setImage(file);
                      }
                    }}
                  />
                </div>
                <button>
                  <MdOutlineDelete />
                  حذف
                </button>
              </div>
            </div>
            <div>
              <label>رمز عبور</label>
              <div className={styles.password_group}>
                <input
                  type="password"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </div>
            </div>
          </section>
        </div>
        <button
          type="submit"
          onClick={updateUser}
          className={styles.submit_btn}
          disabled={!name.trim() || !email.trim() || !phone.trim()}
        >
          ثبت تغییرات
        </button>
      </div>
    </main>
  );
}

export default AccountDetails;
