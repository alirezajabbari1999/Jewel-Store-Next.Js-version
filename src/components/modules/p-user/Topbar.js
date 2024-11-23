"use client";
import { useState, useEffect } from "react";
import styles from "./topbar.module.css";
import { IoIosSearch, IoIosNotifications } from "react-icons/io";
// import Modal from "./Modal";
const Topbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");

  // const [showModal, setShowModal] = useState(false);

  const hideModal = () => setShowModal(false);

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
          <img src="/images/shahin.jpg" alt="" />
        </div>
        <section>
          <div className={styles.searchBox}>
            <input type="text" placeholder="جستجو کنید" />
            <div>
              <IoIosSearch />
            </div>
          </div>
          <div
            onClick={() => setShowNotifications(true)}
            className={styles.notification}
          >
            <IoIosNotifications />
            <span>0</span>
          </div>
        </section>
      </div>

      {showNotifications && (
        <div>
          <div
            onClick={() => setShowNotifications(false)}
            className={styles.notifications_overlay}
          ></div>
          <section className={styles.notifications_box}>
            <div>
              <p
                onClick={() => {
                  setShowNotifications(false);
                  setShowModal(true);
                }}
              >
                سلام ادمین محترم
              </p>
              <button onClick={() => setShowNotifications(false)}>دیدم</button>
            </div>
            <div>
              <p
                onClick={() => {
                  setShowNotifications(false);
                  setShowModal(true);
                }}
              >
                سلام ادمین محترم
              </p>
              <button onClick={() => setShowNotifications(false)}>دیدم</button>
            </div>

            {/* if we dont have any notif we show : */}
            {/* <div>
              <span>پیفامی وجود ندارد</span>
              <IoClose onClick={() => setShowNotifications(false)}/>
            </div> */}
          </section>
        </div>
      )}
      {/* {showModal && (
        <Modal title="از واحد پشتیبانی" hideModal={hideModal}>
          <p className={styles.modal_text}>عالی هستی ادمین عزیز</p>
        </Modal>
      )} */}
    </>
  );
};

export default Topbar;
