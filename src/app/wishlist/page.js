import styles from "@/src/styles/wishlist.module.css";
import Footer from "@/src/components/modules/footer/Footer";
import Navbar from "@/src/components/modules/navbar/Navbar";
import Topbar from "@/src/components/modules/topbar/Topbar";
import BreadCrumb from "@/src/components/modules/breadCrumb/BreadCrumb";
import { Container, Row, Col } from "react-bootstrap";
import connectToDB from "@/config/db";
import { cookies } from "next/headers";
import { verifyToken } from "@/utils/auth";
import userModel from "@/models/User";
import WishlistModel from "@/models/Wishlist";
import Product from "@/src/components/modules/product/Product";
import MiniTopNavbar from "@/src/components/modules/miniTopNavbar/MiniTopNavbar";
import MiniBottomNavbar from "@/src/components/modules/miniBotomNavbar/MiniBottomNavbar";
import Link from "next/link";

export default async function page() {
  await connectToDB();
  let wishes = [];
  let isLoggedIn = false;

  const token = cookies().get("token")?.value;
  if (token) {
    const isValidToken = verifyToken(token);

    if (isValidToken) {
      isLoggedIn = true; // وضعیت لاگین کاربر
      const user = await userModel.findOne({ email: isValidToken.email });
      wishes = await WishlistModel.find({ user: user._id })
        .populate("product")
        .lean();
    }
    console.log("wishes =>", wishes);
  }

  return (
    <>
      <Topbar />
      <Navbar />
      <MiniTopNavbar />

      <Container>
        <div className={styles.wishlist}>
          <BreadCrumb route={"علاقمندی ها"} />

          {!isLoggedIn ? (
            <div className={styles.messageBox}>
              <p className={styles.loginMessage}>
                ابتدا باید وارد حساب کاربری شوید
              </p>
              <Link href="/register" className={styles.loginBtn}>
                ورود / ثبت نام
              </Link>
            </div>
          ) : wishes.length === 0 ? (
            <p className={styles.noWishlistMessage}>
              کالایی را به علاقمندی‌ های خود اضافه نکرده‌اید
            </p>
          ) : (
            <section>
              <Row>
                <p className={styles.title}>محصولات مورد علاقه شما</p>
                {wishes.map((wish) => (
                  <Col key={wish._id} lg={3} md={4} sm={6} xs={12}>
                    <Product {...wish.product} />
                  </Col>
                ))}
              </Row>
            </section>
          )}

          <div className={styles.wishListProducts}></div>
        </div>
      </Container>

      <MiniBottomNavbar />
      <Footer />
    </>
  );
}
