"use client";
import { useState, useEffect } from "react";
import styles from "./topbar.module.css";
import { IoIosSearch, IoIosNotifications } from "react-icons/io";
const Topbar = () => {
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const userInfo = async () => {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      setUserName(data.username);
      setUserRole(data.role);
    };
    userInfo();
  }, []);

  return (
    <>
      <div className={styles.topbar}>
        <div className={styles.profile}>
          <div>
            <p>{userName}</p>

            <span>{userRole === "ADMIN" ? "ادمین" : "کاربر"}</span>
          </div>
          {/* <img src="/images/shahin.jpg" alt="" /> */}
        </div>
        <section>
          <div className={styles.searchBox}>
            <input type="text" placeholder="جستجو کنید" />
            <div>
              <IoIosSearch />
            </div>
          </div>
          <div className={styles.notification}>
            <IoIosNotifications />
            <span>2</span>
          </div>
        </section>
      </div>
    </>
  );
};

export default Topbar;
