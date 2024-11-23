import styles from "./userPanelLayout.module.css";
import Sidebar from "@/src/components/modules/p-user/Sidebar";
import Topbar from "@/src/components/modules/p-user/Topbar";
import { authUser } from "@/utils/serverHelpers";
import { redirect } from "next/navigation";

const Layout = async ({ children }) => {
  // بررسی کردم که چنانچه کاربر لاگین نبود نتونه به صفحه
  // p-user
  // دسترسی پیدا کنه و منتقل شه به صفحه لاگین
  const user = await authUser();
  if (!user) {
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
