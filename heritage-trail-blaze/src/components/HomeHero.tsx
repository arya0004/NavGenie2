
// import { Button } from "@/components/ui/button";
// import { MapPin } from "lucide-react";
// import { Link } from "react-router-dom";

// const HomeHero = () => {
//   return (
//     <div className="relative min-h-[600px] bg-gradient-to-br from-murky-teal to-blue-lagoon text-white">
//       <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587135941948-670b381f08ce')] bg-cover bg-center mix-blend-overlay opacity-20" />
//       <div className="container mx-auto px-4 py-20 relative z-10">
//         <div className="max-w-3xl mx-auto text-center">
//           <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
//             Discover Maharashtra's Rich Heritage
//           </h1>
//           <p className="text-lg md:text-xl mb-8 text-blustery-blue">
//             Embark on a journey through time exploring ancient temples, majestic forts, and vibrant culture
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button 
//               asChild
//               size="lg" 
//               className="bg-pastel-green hover:bg-pastel-green/90 text-murky-teal"
//             >
//               <Link to="/plan-trip">
//                 <MapPin className="mr-2 h-5 w-5" />
//                 Plan Your Journey
//               </Link>
//             </Button>
//             <Button 
//               asChild
//               size="lg" 
//               variant="outline"
//               className="border-white text-white hover:bg-white/10"
//             >
//               <Link to="/quests">
//                 Explore Quests
//               </Link>
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomeHero;
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const images = [
  "https://s7ap1.scene7.com/is/image/incredibleindia/1-gateway-of-india-state-hero?qlt=82&ts=1726670249199",
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/4c/2c/50/the-carvings-on-pillars.jpg?w=1200&h=700&s=1",
  "https://www.andbeyond.com/wp-content/uploads/sites/5/Chhatrapati-Shivaji-Terminus-railway-station-mumbai.jpg",
  "https://blogmedia.testbook.com/blog/wp-content/uploads/2023/07/ellora_caves_india_kailasanatha_temple_2-185381dc-scaled.jpg"
];

const HomeHero = () => {
  return (
    <div className="relative min-h-[700px] bg-gradient-to-br from-murky-teal to-blue-lagoon text-white">
      {/* Carousel */}
      <Swiper
        className="absolute inset-0 z-0"
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000 }}
        modules={[Autoplay]}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Content Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      <div className="container mx-auto px-4 relative z-20 flex items-center justify-center min-h-[600px]">
  <div className="max-w-3xl text-center">
       <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
  Discover Maharashtra's Rich Heritage
</h1>

          <p className="text-lg md:text-xl mb-8 text-blustery-blue">
            Embark on a journey through time exploring ancient temples, majestic forts, and vibrant culture
          </p>
          <div className="flex justify-center">
          <Button
  asChild
  size="lg"
  className="bg-black text-white border border-black hover:bg-white hover:text-black hover:border-black font-semibold"
>

              <a href="#maharashtra-map">
                <MapPin className="mr-2 h-5 w-5" />
                Discover
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
