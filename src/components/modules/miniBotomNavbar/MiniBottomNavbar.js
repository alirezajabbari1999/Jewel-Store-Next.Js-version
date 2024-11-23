import styles from "./miniBotomNavbar.module.css";
import Link from "next/link";
import { GoHome } from "react-icons/go";
import { BiCategoryAlt } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GoHeart } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
import connectToDB from "@/config/db";
import { authUser } from "@/utils/serverHelpers";

export default async function MiniBottomNavbar() {
  await connectToDB();
  const user = await authUser();

  return (
    <div className={styles.MiniBottomNavbar}>
      <div className={styles.miniBottomNavbarContainer}>
        <Link href="/" className={styles.miniBottomNavbarItem}>
          <GoHome className={styles.icon} />
          <span className={styles.title}>خانه</span>
        </Link>

        <Link href="/wishlist" className={styles.miniBottomNavbarItem}>
          <GoHeart className={styles.icon} />
          <span className={styles.title}>علاقه مندی ها</span>
        </Link>
        
        <Link href="" className={styles.miniBottomNavbarShoppingBox}>
          <AiOutlineShoppingCart className={styles.shoppingCartIcon} />
          <span className={styles.shoppingCartCount}>0</span>
        </Link>
        <Link href="/shop" className={styles.miniBottomNavbarItem}>
          <BiCategoryAlt className={styles.icon} />
          <span className={styles.title}>فروشگاه</span>
        </Link>

        {user ? (
          <Link href="/p-user" className={styles.miniBottomNavbarItem}>
            <FaRegUser className={styles.icon} />
            <span className={styles.title}>حساب کاربری</span>
          </Link>
        ) : (
          <Link href="/register" className={styles.miniBottomNavbarItem}>
            <FaRegUser className={styles.icon} />
            <span className={styles.title}>ورود/ثبت نام</span>
          </Link>
        )}
      </div>
    </div>
  );
}
