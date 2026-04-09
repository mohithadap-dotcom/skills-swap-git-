import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import CityPreview from "@/components/CityPreview";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <HowItWorks />
      <CityPreview />
      <Footer />
    </div>
  );
}
