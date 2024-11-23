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

const Sidebar = () => {
  const [userName, setUserName] = useState("");

  // اینجا آدرس یو آر الی که کاربر توی اون هست رو گرفتیم تا براساس مقدار یو آر ال
  // آیتم های ساید بار رو تععین کنیم
  const path = usePathname();

  const logoutHandler = () => {
    swal({
      title: "آیا از خروج اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch("/api/auth/signout", {
          method: "POST",
        });
        if (res.status === 200) {
          swal({
            title: "با موفقیت خارج شدید",
            icon: "success",
            buttons: "متوجه شدم",
          });
          localStorage.removeItem("userInfo");
          location.replace("/");
        }
      }
    });
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
      <div className={styles.sidebarHeader}>
        <p>خوش اومدی {userName}</p>
      </div>
      <ul className={styles.sidebarMain}>
        {/* اینجا گفتیم که اگه یو آر ال شامل
        p-user
        بود آیتم های منو مربوط به کاربر نمایش داده شه */}
        {path.includes("/p-user") ? (
          <>
            <Link
              href={"/p-user"}
              className={path === "/p-user" ? styles.sidebarLinkActive : ""}
            >
              <ImReply />
              پیشخوان
            </Link>
            <Link
              href={"/p-user/orders"}
              className={
                path === "/p-user/orders" ? styles.sidebarLinkActive : ""
              }
            >
              <FaShoppingBag />
              سفارش ها
            </Link>
            <Link
              href={"/p-user/tickets"}
              className={
                path === "/p-user/tickets" ? styles.sidebarLinkActive : ""
              }
            >
              <MdSms />
              تیکت های پشتیبانی
            </Link>

            <Link
              href={"/p-user/comments"}
              className={
                path === "/p-user/comments" ? styles.sidebarLinkActive : ""
              }
            >
              <FaComments />
              کامنت ها
            </Link>

            <Link
              href={"/p-user/wishlist"}
              className={
                path === "/p-user/wishlist" ? styles.sidebarLinkActive : ""
              }
            >
              <FaHeart />
              علاقه مندی
            </Link>

            <Link
              href={"/p-user/account-details"}
              className={
                path === "/p-user/account-details"
                  ? styles.sidebarLinkActive
                  : ""
              }
            >
              <TbListDetails />
              جزئیات اکانت
            </Link>
          </>
        ) : (
          <>
            {/* اینجا گفتیم که اگه یو آر ال شامل
                p-user
            نبود آیتم های منو مربوط به ادمین نمایش داده شه */}

            <Link href={"/p-admin"} className={styles.sidebar_link_active}>
              <ImReply />
              پیشخوان
            </Link>

            <Link href={"/p-admin/products"}>
              <FaShoppingBag />
              محصولات
            </Link>
            <Link href={"/p-admin/users"}>
              <FaUsers />
              کاربران
            </Link>
            <Link href={"/p-admin/comments"}>
              <FaComments />
              کامنت ها
            </Link>

            <Link href={"/p-admin/tickets"}>
              <MdSms />
              تیکت ها
            </Link>
            <Link href={"/p-admin/discount"}>
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
