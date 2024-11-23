"use client";
import { useState } from "react";
import Footer from "@/src/components/modules/footer/Footer";
import Navbar from "@/src/components/modules/navbar/Navbar";
import Topbar from "@/src/components/modules/topbar/Topbar";
import styles from "@/src/styles/register.module.css";
import logoGif from "@/public/images/logo.gif";
import Image from "next/image";
import LoginForm from "@/src/components/templates/register/loginForm/LoginForm";
import RegisterForm from "@/src/components/templates/register/registerForm/RegisterForm";

export default function page() {
  const [formType, setFormType] = useState("login");

  const showLoginForm = () => {
    setFormType("login");
  };

  const showRegisterForm = () => {
    setFormType("register");
  };

  return (
    <div>
      <Topbar />
      <Navbar />

      <div className={styles.registerForm}>
        <div className={styles.formType}>
          <div
            className={`${styles.typeLogin} ${
              formType === "login" ? styles.active : ""
            }`}
            onClick={showLoginForm}
          >
            ورود
          </div>
          <div
            className={`${styles.typeRegister} ${
              formType === "register" ? styles.active : ""
            }`}
            onClick={showRegisterForm}
          >
            عضویت
          </div>
        </div>
        <div className={styles.imageBox}>
          <Image src={logoGif} alt="logo gif" className={styles.image} />
        </div>
        {formType === "login" ? <LoginForm /> : <RegisterForm />}
      </div>

      <Footer />
    </div>
  );
}
