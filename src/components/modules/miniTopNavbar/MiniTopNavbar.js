import styles from "./miniTopNavbar.module.css";
import { Container } from "react-bootstrap";
import Link from "next/link";
import { CgMenuRight } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import logo from "@/public/images/logo.png";
import Image from "next/image";

export default function MiniTopNavbar() {
  return (
    <Container className="container-custom">
      <div className={styles.miniNavbar}>
        {/* ردیف اول نوبار */}
        <div className={styles.miniNavbarFirstRow}>
          <div className={styles.sidebarIconBox}>
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
            <div className={styles.shoppingCard}>
              <AiOutlineShoppingCart className={styles.shoppingCardIcon} />
              <span className={styles.shoppingCount}>0</span>
            </div>
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
    </Container>
  );
}
