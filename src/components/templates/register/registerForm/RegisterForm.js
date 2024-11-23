"use client";
import { useState } from "react";
import styles from "./register.module.css";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import swal from "sweetalert"

export default function RegisterForm() {
  const router = useRouter();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const registerHandler = async (e) => {
    e.preventDefault();

    e.preventDefault();
    if (!username.trim()) {
      toast.warning("لطفا نام کاربری خود را وارد کنید", {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
      });
    }
    if (!email.trim()) {
      toast.warning("لطفا آدرس ایمیل خود را وارد کنید", {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
      });
    }
    if (!phone.trim()) {
      toast.warning("لطفا شماره تلفن خود را وارد کنید", {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
      });
    }
    if (!password.trim()) {
      toast.warning("لطفا رمز عبور خود را وارد کنید", {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
      });
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, phone, password }),
    });
    if (res.status === 201) {
      swal({
        title: "ثبت نام با موفقیت انجام شد",
        icon: "success",
        buttons: "متوجه شدم",
      });
      setUserName("");
      setEmail("");
      setPhone("");
      setPassword("");
      router.push("/");
    }
  };

  return (
    <>
      <div className={styles.loginFormContainer}>
        <div className={styles.loginForm}>
          <div className={styles.formContainer}>
            <form action="" className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.inputBox}>
                  <input
                    type="text"
                    placeholder="نام کاربری"
                    className={styles.input}
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.inputBox}>
                  <input
                    type="email"
                    placeholder="ایمیل"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.inputBox}>
                  <input
                    type="text"
                    placeholder="شماره موبایل"
                    className={styles.input}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.inputBox}>
                  <input
                    type="password"
                    placeholder="رمز عبور"
                    className={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.formRow}>
                <input
                  className={styles.submitBtn}
                  type="submit"
                  value="ثبت نام"
                  onClick={registerHandler}
                />
              </div>
            </form>
          </div>
        </div>

        {/*  افزودن ToastContainer برای نمایش نوتیفیکیشن‌ها  */}
        <ToastContainer />
      </div>
    </>
  );
}
