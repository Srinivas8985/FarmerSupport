import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import Categories from "./components/Categories";
import ProductShowcase from "./components/ProductShowcase";
import FarmerCard from "./components/FarmerCard";
import BuyerCard from "./components/BuyerCard";
import Testimonials from "./components/Testimonials";
import WhyChooseUs from "./components/WhyChooseUs";
import ImageBanner from "./components/ImageBanner";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <Categories />
      <ProductShowcase />
      <ImageBanner />
      <FarmerCard />
      <BuyerCard />
      <Testimonials />
      <WhyChooseUs />
      <Footer />
    </>
  );
}
