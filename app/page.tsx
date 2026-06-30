import TopBar from "./components/TopBar";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Values from "./components/Values";
import WhatWeDo from "./components/WhatWeDo";
import WhyChooseUs from "./components/WhyChooseUs";
import StrategicOverview from "./components/StrategicOverview";
import Stats from "./components/Stats";
import CompetitiveAdvantage from "./components/CompetitiveAdvantage";
import SuccessStories from "./components/SuccessStories";
import Team from "./components/Team";
import Footer from "./components/Footer";

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
        <StrategicOverview />
        <Stats />
        <CompetitiveAdvantage />
        <SuccessStories />
        <Team />
      </main>
      <Footer />
    </div>
  );
}
