
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const TrendingSection = () => {
  const trendingPlaces = [
    {
      id: 1,
      name: "Gateway of India",
      city: "Mumbai",
      image: "https://th.bing.com/th/id/OIP.m3UCiybiuZ_pJ-igAbZoegHaHA?rs=1&pid=ImgDetMain",
      likes: 3245
    },
    {
      id: 2,
      name: "Shaniwar Wada",
      city: "Pune",
      image: "https://www.historicnation.in/storage/2023/11/Shaniwar-Wada-Fort-at-Pune.jpg",
      likes: 2871
    },
    {
      id: 3,
      name: "Zero Mile Stone",
      city: "Nagpur",
      image: "https://cdn.dnaindia.com/sites/default/files/styles/full/public/2019/06/01/831127-stone-pillar-in-nagpur.jpg",
      likes: 1945
    },
    {
      id: 4,
      name: "Ajanta Caves",
      city: "Aurangabad",
      image: "https://cdn.getyourguide.com/img/tour/5b881053dad2b.jpeg/145.jpg",
      likes: 2109
    }
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-murky-teal mb-4">Trending Destinations</h2>
        <p className="text-blue-lagoon max-w-2xl mx-auto">
          Discover the most popular heritage sites that travelers are exploring right now
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {trendingPlaces.map((place) => (
          <Link key={place.id} to={`/city/${place.city.toLowerCase()}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="relative">
                <img 
                  src={place.image} 
                  alt={place.name} 
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-pastel-green text-murky-teal text-xs px-2 py-1 rounded-full">
                  {place.likes.toLocaleString()} likes
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-murky-teal mb-1">{place.name}</h3>
                <p className="text-blue-lagoon text-sm">{place.city}</p>
                <div className="mt-3 inline-flex items-center text-pastel-green group-hover:text-green-pear transition-colors">
                  Explore
                  <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrendingSection;
