import styles from "@/src/styles/product.module.css";
import { Container, Row, Col } from "react-bootstrap";
import Topbar from "@/src/components/modules/topbar/Topbar";
import Navbar from "@/src/components/modules/navbar/Navbar";
import MiniTopNavbar from "@/src/components/modules/miniTopNavbar/MiniTopNavbar";
import MiniBottomNavbar from "@/src/components/modules/miniBotomNavbar/MiniBottomNavbar";
import Footer from "@/src/components/modules/footer/Footer";
import Gallery from "@/src/components/templates/product/gallery/Gallery";
import Details from "@/src/components/templates/product/details/Details";
import BuySection from "@/src/components/templates/product/buySection/BuySection";
import MoreProducts from "@/src/components/templates/product/moreProducts/MoreProducts";
import Tabs from "@/src/components/templates/product/tabs/Tabs";
import connectToDB from "@/config/db";
import productModel from "@/models/Product";
import commentModel from "@/models/Comment";

export default async function page({ params }) {
  await connectToDB();
  const productID = await params.id;
  const product = await productModel
    .findOne({ _id: productID })
    .populate("comments")
    .lean();

  // فیلتر محصولات بر اساس نوع آنها برای استفاده در کامپوننت
  // MoreProducts (بخش محصولات مرتبط)
  const relatedProducts = await productModel.find({ type: product.type });

  const allComments = await commentModel.find({}).lean();

  return (
    <>
      <Topbar />
      <Navbar />
      <MiniTopNavbar />

      <Container>
        <div className={styles.productContainer}>
          <Row>
            <Col lg={4}>
              <Gallery product={JSON.parse(JSON.stringify(product))} />
            </Col>

            <Col lg={4}>
              <Details product={JSON.parse(JSON.stringify(product))} />
            </Col>

            <Col lg={4}>
              <BuySection product={JSON.parse(JSON.stringify(product))} />
            </Col>
          </Row>
        </div>
        <MoreProducts
          moreProducts={JSON.parse(JSON.stringify(relatedProducts))}
        />
        <Tabs
          product={JSON.parse(JSON.stringify(product))}
          allComments={JSON.parse(JSON.stringify(allComments))}
        />
      </Container>

      <MiniBottomNavbar />
      <Footer />
    </>
  );
}
