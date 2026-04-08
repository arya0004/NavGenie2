
import Navigation from "@/components/Navigation";
import HomeHero from "@/components/HomeHero";
import MaharashtraMap from "@/components/MaharashtraMap";
import CitiesCarousel from "@/components/CitiesCarousel";
import TrendingSection from "@/components/TrendingSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-blustery-blue/10">
      <Navigation />
      <main className="flex-grow">
        <HomeHero />
        
        <section className="py-20">
          <MaharashtraMap />
        </section>

        <section className="py-20 bg-white">
          <CitiesCarousel />
        </section>

        <section className="py-20 bg-gradient-to-br from-murky-teal/5 to-blue-lagoon/5">
          <TrendingSection />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
