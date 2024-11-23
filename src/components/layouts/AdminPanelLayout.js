import React from "react";
import styles from "./adminPanelLayout.module.css";
import Sidebar from "@/src/components/modules/p-admin/Sidebar";
import Topbar from "@/src/components/modules/p-admin/Topbor";
import { authUser } from "@/utils/serverHelpers";
import { redirect } from "next/navigation";

const Layout = async ({ children }) => {
  // شرط گذاشتم که اگه کاربر وجود داشت ولی اگه رولش برابر با ادمین نبود به صفحه لاگین
  // هدایت شه و اجازه دسترسی به
  // p-admin
  //رو پیدا نکنه و اگه کاربر وجود هم نداشت بازم بره به صفحه لاگین
  const user = await authUser();
  if (user) {
    if (user.role !== "ADMIN") {
      redirect("/register");
    }
  } else {
    redirect("/register");
  }

  return (
    <div className={styles.layout}>
      <section className={styles.section}>
        <Sidebar />
        <div className={styles.contents}>
          <Topbar />
          {children}
        </div>
      </section>
    </div>
  );
};

export default Layout;
