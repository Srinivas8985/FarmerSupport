import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
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

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";

const Home = () => (
  <>
    <HeroSection />
    <Categories />
    <ProductShowcase />
    <ImageBanner />
    <FarmerCard />
    <BuyerCard />
    <Testimonials />
    <WhyChooseUs />
  </>
);

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <NavBar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/marketplace" element={<Marketplace />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
