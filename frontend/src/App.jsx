import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import ScrollToTop from "./components/layout/ScrollToTop";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/ContactPageV2";
import Footer from "./components/layout/Footer";
import BtnTop from "./components/layout/BtnTop";
import MobileAppProject from "./requestquote/MobileAppProject";
import WebAppProject from "./requestquote/WebAppProject";
import ServicesPreview from "./components/features/home/ServicesPreview";





function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/MobileAppProject" element={<MobileAppProject />} />
        <Route path="/WebAppProject" element={<WebAppProject />} />
        <Route path="/ServicesPreview" element={<ServicesPreview />} />


      </Routes>
      <BtnTop />

      <Footer />
    </>
  );
}

export default App;
