import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import ScrollToTop from "./components/layout/ScrollToTop";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
// import Contact from "./pages/ContactPage";
import Contact from "./pages/ContactPageV2";
import Footer from "./components/layout/Footer";
import WebQuestionnaire from "./pages/WebQuestionnaire";
import MobileQuestionnarie from "./pages/MobileQuestionnarie";
import BtnTop from "./components/layout/BtnTop";
import PencilCursor from "./components/animations/PencilCursor";
import AdvancedServices from "./components/features/services/AdvancedServices";
import ServicesShowcase from "./components/features/services/ServicesShowcase";
import MobileAppProject from "./pages/MobileAppProject";
import  WebAppProject from "./pages/WebAppProject";




function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      {/* <CircleHover /> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/webquestionnarie" element={<WebQuestionnaire />} />
        <Route path="/mobilequestionnarie" element={<MobileQuestionnarie />} />
        <Route path="/AdvancedServices" element={<AdvancedServices />} />
        <Route path="/ServicesShowcase" element={<ServicesShowcase />} />
        <Route path="/MobileAppProject" element={<MobileAppProject />} />
        <Route path="/WebAppProject" element={<WebAppProject />} />
        
        {/* <Route path="/herosection" element={<HeroSection />} /> */}

      </Routes>
      <PencilCursor />
      <BtnTop />

      <Footer />
    </>
  );
}

export default App;
