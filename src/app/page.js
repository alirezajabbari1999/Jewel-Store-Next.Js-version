import Navbar from "@/src/components/modules/navbar/Navbar";
import Topbar from "@/src/components/modules/topbar/Topbar";
import Slider from "@/src/components/templates/index/slider/Slider";
import TopCategories from "../components/templates/index/topCategories/TopCategories";
import HandArtSection from "../components/templates/index/handArtSection/HandArtSection";
import ValentineAccessory from "../components/templates/index/valentineAccessory/ValentineAccessory";
import ParsAccessory from "../components/templates/index/parsAccessory/ParsAccessory";
import AccessoryGardanband from "../components/templates/index/accessoryGardanband/accessoryGardanband";
import AddBaner from "../components/templates/index/addBanner/AddBaner";
import AccessoryDastband from "../components/templates/index/accessoryDastband/AccessoryDastband";
import BannersSection from "../components/templates/index/bannersSection/BannersSection";
import AccessoryPorbazdid from "../components/templates/index/accessoryPorbazdid/AccessoryPorbazdid";
import Footer from "../components/modules/footer/Footer";
import ContactUsBadge from "../components/modules/contactUsBadge/ContactUsBadge";
import connectToDB from "@/config/db";
import productModel from "@/models/Product";
import MiniTopNavbar from "../components/modules/miniTopNavbar/MiniTopNavbar";
import MiniBottomNavbar from "../components/modules/miniBotomNavbar/MiniBottomNavbar";

export default async function Home() {
  await connectToDB();
  const allProducts = await productModel.find({}).sort({ _id: -1 }).lean();

  return (
    <>
      <Topbar />
      <Navbar />
      <MiniTopNavbar />
      <Slider />
      <TopCategories />
      <HandArtSection allProducts={JSON.parse(JSON.stringify(allProducts))} />
      <ValentineAccessory
        allProducts={JSON.parse(JSON.stringify(allProducts))}
      />
      <ParsAccessory />
      <AccessoryGardanband
        allProducts={JSON.parse(JSON.stringify(allProducts))}
      />
      <AddBaner />
      <AccessoryDastband
        allProducts={JSON.parse(JSON.stringify(allProducts))}
      />
      <BannersSection />
      <AccessoryPorbazdid
        allProducts={JSON.parse(JSON.stringify(allProducts))}
      />
      <Footer />
      <MiniBottomNavbar />
      <ContactUsBadge />
    </>
  );
}
