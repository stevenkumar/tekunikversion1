import { Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import ScrollToTop from "./component/ScrollToTop";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/ContactPage";
import Footer from "./component/Footer";
import HeroSection from "./pages/HeroSection";
import WebQuestionnaire from "./pages/WebQuestionnaire";
import MobileQuestionnarie from "./pages/MobileQuestionnarie";
import BtnTop from "./component/Btntop";
import PencilCursor from "./component/mousemovement/PencilCursor";
import AdvancedServices from "./component/services/AdvancedServices";
import ServicesShowcase from "./component/services/ServicesShowcase";




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
        <Route path="/webquestionnarie" element={<WebQuestionnaire />} />
        <Route path="/mobilequestionnarie" element={<MobileQuestionnarie />} />
        <Route path="/AdvancedServices" element={<AdvancedServices />} />
        <Route path="/ServicesShowcase" element={<ServicesShowcase />} />
        {/* <Route path="/herosection" element={<HeroSection />} /> */}

      </Routes>
      <PencilCursor />
      <BtnTop />

      <Footer />
    </>
  );
}

export default App;
