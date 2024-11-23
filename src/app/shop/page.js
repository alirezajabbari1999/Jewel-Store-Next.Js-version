import Footer from "@/src/components/modules/footer/Footer";
import Navbar from "@/src/components/modules/navbar/Navbar";
import Topbar from "@/src/components/modules/topbar/Topbar";
import MiniTopNavbar from "@/src/components/modules/miniTopNavbar/MiniTopNavbar";
import MiniBottomNavbar from "@/src/components/modules/miniBotomNavbar/MiniBottomNavbar";
import ShopCardContainer from "@/src/components/templates/shop/shopCartContainer/ShopCardContainer";
import ShopHeader from "@/src/components/templates/shop/shopHeader/ShopHeader";
import productModel from "@/models/Product";
import connectToDB from "@/config/db";

export default async function page() {
  await connectToDB();
  const allProducts = await productModel.find({}).lean();

  return (
    <>
      <Topbar />
      <Navbar />
      <MiniTopNavbar />
      <ShopHeader allProducts={JSON.parse(JSON.stringify(allProducts))} />
      <ShopCardContainer
        allProducts={JSON.parse(JSON.stringify(allProducts))}
      />
      <MiniBottomNavbar />
      <Footer />
    </>
  );
}
