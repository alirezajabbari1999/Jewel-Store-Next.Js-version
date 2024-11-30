import styles from "@/src/styles/checkout.module.css";
import Footer from "@/src/components/modules/footer/Footer";
import Navbar from "@/src/components/modules/navbar/Navbar";
import Topbar from "@/src/components/modules/topbar/Topbar";
import MiniTopNavbar from "@/src/components/modules/miniTopNavbar/MiniTopNavbar";
import MiniBottomNavbar from "@/src/components/modules/miniBotomNavbar/MiniBottomNavbar";
import { Container } from "react-bootstrap";
import Table from "@/src/components/templates/checkout/table/Table";

export default function page() {
  return (
    <>
      <Topbar />
      <Navbar />
      <MiniTopNavbar />

      <Container>
        <div className={styles.checkout}>
          <Table />
        </div>
      </Container>

      <MiniBottomNavbar />
      <Footer />
    </>
  );
}
