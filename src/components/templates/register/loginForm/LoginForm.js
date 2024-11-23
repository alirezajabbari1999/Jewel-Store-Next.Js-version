"use client";
import { useState } from "react";
import styles from "./loginForm.module.css";
import { IoMdEye } from "react-icons/io";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter()
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    if (!identifier.trim()) {
      toast.warning("لطفا ایمیل یا شماره تلفن خود را وارد کنید", {
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

    const res = await fetch("/api/auth/signin" , {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({identifier,password})
    })
    if(res.status === 200){
      toast.success("لاگین با موفقیت انجام شد", {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
      });
      setIdentifier("");
      setPassword("");
      router.push("/");
    }
    if(res.status === 401){
      toast.warning("ایمیل / شماره تلفن یا پسوورد اشتباه است", {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
      });
    }
    if(res.status === 404){
      toast.error("کاربری یافت نشد", {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
      });
    }
  };

  return (
    <div className={styles.loginFormContainer}>
      <div className={styles.loginForm}>
        <div className={styles.formContainer}>
          <form action="" className={styles.form}>
            <div className={styles.formRow}>
              <div className={styles.inputBox}>
                <input
                  type="text"
                  placeholder="ایمیل / شماره تلفن"
                  className={styles.input}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
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
                <IoMdEye className={styles.showIcon} />
              </div>
            </div>
            <div className={styles.checkboxRow}>
              <input type="checkbox" />
              <label htmlFor="">مرا به خاطر بسپار</label>
            </div>
            <div className={styles.formRow}>
              <input
                className={styles.submitBtn}
                type="submit"
                value="ورود به سایت"
                onClick={loginHandler}
              />

              <button className={styles.openOtpForm}>
                ورود با کد یکبار مصرف
              </button>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer style={{zIndex: 99999}} theme="colored"/>
    </div>
  );
}
