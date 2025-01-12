
// "use client";
// import styles from "./miniBotomNavbar.module.css";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { GoHome } from "react-icons/go";
// import { BiCategoryAlt } from "react-icons/bi";
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import { GoHeart } from "react-icons/go";
// import { FaRegUser } from "react-icons/fa";

// export default function MiniBottomNavbar() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     async function fetchUser() {
//       try {
//         const response = await fetch("/api/auth/me");
//         if (response.ok) {
//           const data = await response.json();
//           setUser(data);
//         } else {
//           setUser(null);
//         }
//       } catch (error) {
//         console.error("Failed to fetch user:", error);
//       }
//     }
//     fetchUser();
//   }, []);

//   return (
//     <div className={styles.MiniBottomNavbar}>
//       <div className={styles.miniBottomNavbarContainer}>
//         <Link href="/" className={styles.miniBottomNavbarItem}>
//           <GoHome className={styles.icon} />
//           <span className={styles.title}>خانه</span>
//         </Link>

//         <Link href="/wishlist" className={styles.miniBottomNavbarItem}>
//           <GoHeart className={styles.icon} />
//           <span className={styles.title}>علاقه مندی ها</span>
//         </Link>
        
//         <Link href="/checkout" className={styles.miniBottomNavbarShoppingBox}>
//           <AiOutlineShoppingCart className={styles.shoppingCartIcon} />
//           <span className={styles.shoppingCartCount}>0</span>
//         </Link>

//         <Link href="/shop" className={styles.miniBottomNavbarItem}>
//           <BiCategoryAlt className={styles.icon} />
//           <span className={styles.title}>فروشگاه</span>
//         </Link>

//         {user ? (
//           <Link href="/p-user" className={styles.miniBottomNavbarItem}>
//             <FaRegUser className={styles.icon} />
//             <span className={styles.title}>حساب کاربری</span>
//           </Link>
//         ) : (
//           <Link href="/register" className={styles.miniBottomNavbarItem}>
//             <FaRegUser className={styles.icon} />
//             <span className={styles.title}>ورود/ثبت نام</span>
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// }




"use client";
import styles from "./miniBotomNavbar.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GoHome } from "react-icons/go";
import { BiCategoryAlt } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GoHeart } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";

export default function MiniBottomNavbar() {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const calculateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalCount = cart.reduce((total, item) => total + item.count, 0);
    setCartCount(totalCount);
  };

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    }

    fetchUser();

    // محاسبه تعداد محصولات در سبد خرید در بارگذاری اولیه
    calculateCartCount();

    // گوش دادن به تغییرات LocalStorage
    const handleStorageChange = () => {
      calculateCartCount();
    };

    window.addEventListener("storage", handleStorageChange);

    // پاک‌سازی گوش‌دهنده
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className={styles.MiniBottomNavbar}>
      <div className={styles.miniBottomNavbarContainer}>
        <Link href="/" className={styles.miniBottomNavbarItem}>
          <GoHome className={styles.icon} />
          <span className={styles.title}>خانه</span>
        </Link>

        <Link href="/wishlist" className={styles.miniBottomNavbarItem}>
          <GoHeart className={styles.icon} />
          <span className={styles.title}>علاقه‌مندی‌ها</span>
        </Link>

        <Link href="/checkout" className={styles.miniBottomNavbarShoppingBox}>
          <AiOutlineShoppingCart className={styles.shoppingCartIcon} />
          <span className={styles.shoppingCartCount}>{cartCount}</span>
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
