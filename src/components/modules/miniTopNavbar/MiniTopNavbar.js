// "use client";
// import { useState } from "react";
// import styles from "./miniTopNavbar.module.css";
// import { Container } from "react-bootstrap";
// import Link from "next/link";
// import { CgMenuRight } from "react-icons/cg";
// import { CiSearch } from "react-icons/ci";
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import logo from "@/public/images/logo.png";
// import Image from "next/image";
// import Sidebar from "@/src/components/modules/sidebar/Sidebar";

// export default function MiniTopNavbar() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const openSidebar = () => {
//     setIsSidebarOpen(true);
//   };

//   const closeSidebar = () => {
//     setIsSidebarOpen(false);
//   };

//   return (
//     <Container className="container-custom">
//       <div className={styles.miniNavbar}>
//         {/* ردیف اول نوبار */}
//         <div className={styles.miniNavbarFirstRow}>
//           <div className={styles.sidebarIconBox} onClick={openSidebar}>
//             <span className={styles.sidebarIcon}>
//               <CgMenuRight className={styles.icon} />
//             </span>
//             <span className={styles.title}>منو</span>
//           </div>

//           <div className={styles.logoBox}>
//             <Link href="/" className={styles.link}>
//               <Image
//                 src={logo}
//                 alt="logo"
//                 className={styles.logo}
//                 width={250}
//                 height={250}
//               />
//             </Link>
//           </div>

//           <div className={styles.panelBox}>
//             <Link href="" className={styles.shoppingCard}>
//               <AiOutlineShoppingCart className={styles.shoppingCardIcon} />
//               <span className={styles.shoppingCount}>0</span>
//             </Link>
//           </div>
//         </div>

//         {/* ردیف دوم نوبار */}
//         <div className={styles.miniNavbarSecondRow}>
//           <div className={styles.searchBox}>
//             <CiSearch className={styles.searchIcon} />
//             <input
//               type="text"
//               placeholder="جستجو در هزاران محصول..."
//               className={styles.searchInput}
//             />
//           </div>
//         </div>
//       </div>

//       <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
//       <div
//         className={`overly ${isSidebarOpen ? "active" : ""}`}
//         onClick={closeSidebar}
//       ></div>
//     </Container>
//   );
// }




"use client";
import { useState, useEffect } from "react";
import styles from "./miniTopNavbar.module.css";
import { Container } from "react-bootstrap";
import Link from "next/link";
import { CgMenuRight } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { AiOutlineShoppingCart } from "react-icons/ai";
import logo from "@/public/images/logo.png";
import Image from "next/image";
import Sidebar from "@/src/components/modules/sidebar/Sidebar";

export default function MiniTopNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [shoppingCount, setShoppingCount] = useState(0);

  // خواندن تعداد اقلام سبد خرید از localStorage و تنظیم state
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalCount = cart.reduce((acc, item) => acc + item.count, 0);
    setShoppingCount(totalCount);
  }, []);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <Container className="container-custom">
      <div className={styles.miniNavbar}>
        {/* ردیف اول نوبار */}
        <div className={styles.miniNavbarFirstRow}>
          <div className={styles.sidebarIconBox} onClick={openSidebar}>
            <span className={styles.sidebarIcon}>
              <CgMenuRight className={styles.icon} />
            </span>
            <span className={styles.title}>منو</span>
          </div>

          <div className={styles.logoBox}>
            <Link href="/" className={styles.link}>
              <Image
                src={logo}
                alt="logo"
                className={styles.logo}
                width={250}
                height={250}
              />
            </Link>
          </div>

          <div className={styles.panelBox}>
            <Link href="/checkout" className={styles.shoppingCard}>
              <AiOutlineShoppingCart className={styles.shoppingCardIcon} />
              <span className={styles.shoppingCount}>{shoppingCount}</span>
            </Link>
          </div>
        </div>

        {/* ردیف دوم نوبار */}
        <div className={styles.miniNavbarSecondRow}>
          <div className={styles.searchBox}>
            <CiSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="جستجو در هزاران محصول..."
              className={styles.searchInput}
            />
          </div>
        </div>
      </div>

      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      <div
        className={`overly ${isSidebarOpen ? "active" : ""}`}
        onClick={closeSidebar}
      ></div>
    </Container>
  );
}
