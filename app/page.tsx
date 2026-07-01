import TopBar from "./components/TopBar";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Values from "./components/Values";
import WhatWeDo from "./components/WhatWeDo";
import WhyChooseUs from "./components/WhyChooseUs";
import Stats from "./components/Stats";
import CompetitiveAdvantage from "./components/CompetitiveAdvantage";
import SuccessStories from "./components/SuccessStories";
import Team from "./components/Team";
import Careers from "./components/Careers";
import Footer from "./components/Footer";
import SanTechMarquee from "./components/SanTechMarquee";
import ScrollToTop from "./components/ScrollToTop";
import ContactModal from "./components/ContactModal";
import ApplyModal from "./components/ApplyModal";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <TopBar />
      <Header />
      <main className="flex flex-1 flex-col">
        <Hero />
        <About />
        <Values />
        <WhatWeDo />
        <WhyChooseUs />
        <Stats />
        <CompetitiveAdvantage />
        <SuccessStories />
        <Team />
        <Careers />
        <SanTechMarquee />
      </main>
      <Footer />
      <ScrollToTop />
      <ContactModal />
      <ApplyModal />
    </div>
  );
}
