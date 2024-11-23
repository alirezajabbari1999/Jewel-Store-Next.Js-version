"use client";
import { useState, useEffect } from "react";
import styles from "./sidebar.module.css";
import { ImReply } from "react-icons/im";
import { FaComments, FaHeart, FaShoppingBag, FaUsers } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { MdSms, MdLogout } from "react-icons/md";
import { usePathname } from "next/navigation";
import { TbListDetails } from "react-icons/tb";
import Link from "next/link";
import swal from "sweetalert";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const path = usePathname();
  const router = useRouter();
  const [userName, setUserName] = useState("");

  const logoutHandler = async () => {
    const res = await fetch("/api/auth/signout", {
      method: "POST",
    });
    if (res.status === 200) {
      swal({
        title: "آیا از خروج اطمینان دارید؟",
        icon: "warning",
        buttons: ["نه", "آره"],
      }).then(() => {
        localStorage.removeItem("userInfo");
        router.replace("/");
      });
    }
  };

  useEffect(() => {
    const userInfo = async () => {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      setUserName(data.username);
    };
    userInfo();
  }, []);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar_header}>
        <p>خوش اومدی {userName}</p>
      </div>
      <ul className={styles.sidebar_main}>
        {path.includes("/p-user") ? (
          <>
            <Link href={"/p-user"} className={styles.sidebar_link_active}>
              <ImReply />
              پیشخوان
            </Link>
            <Link href={"/p-user/orders"}>
              <FaShoppingBag />
              سفارش ها
            </Link>
            <Link href={"/p-user/tickets"}>
              <MdSms />
              تیکت های پشتیبانی
            </Link>
            <Link href={"/p-user/comments"}>
              <FaComments />
              کامنت ها
            </Link>
            <Link href={"/p-user/wishlist"}>
              <FaHeart />
              علاقه مندی
            </Link>
            <Link href={"/p-user/account-details"}>
              <TbListDetails />
              جزئیات اکانت
            </Link>
          </>
        ) : (
          <>
            <Link
              href={"/p-admin"}
              className={path === "/p-admin" ? styles.sidebar_link_active : ""}
            >
              <ImReply />
              پیشخوان
            </Link>

            <Link
              href={"/p-admin/products"}
              className={
                path === "/p-admin/products" ? styles.sidebar_link_active : ""
              }
            >
              <FaShoppingBag />
              محصولات
            </Link>
            <Link
              href={"/p-admin/users"}
              className={
                path === "/p-admin/users" ? styles.sidebar_link_active : ""
              }
            >
              <FaUsers />
              کاربران
            </Link>
            <Link
              href={"/p-admin/comments"}
              className={
                path === "/p-admin/comments" ? styles.sidebar_link_active : ""
              }
            >
              <FaComments />
              کامنت ها
            </Link>

            <Link
              href={"/p-admin/tickets"}
              className={
                path === "/p-admin/tickets" ? styles.sidebar_link_active : ""
              }
            >
              <MdSms />
              تیکت ها
            </Link>
            <Link
              href={"/p-admin/discounts"}
              className={
                path === "/p-admin/discounts" ? styles.sidebar_link_active : ""
              }
            >
              <MdOutlineAttachMoney />
              تخفیفات
            </Link>
          </>
        )}
      </ul>
      <div className={styles.logout} onClick={logoutHandler}>
        <MdLogout />
        خروج
      </div>
    </aside>
  );
};

export default Sidebar;
