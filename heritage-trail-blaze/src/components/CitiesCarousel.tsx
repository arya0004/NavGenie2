
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const cities = [
  {
    id: 'mumbai',
    name: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1562979314-bee7453e911c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    description: 'Experience the bustling energy and historic landmarks of the City of Dreams'
  },
  {
    id: 'pune',
    name: 'Pune',
    image: 'https://c8.alamy.com/comp/P3EW11/garden-of-shaniwar-wada-palace-pune-india-P3EW11.jpg',
    description: 'Discover the cultural capital of Maharashtra with its rich Maratha history'
  },
  {
    id: 'nagpur',
    name: 'Nagpur',
    image: 'https://i0.wp.com/stanzaliving.wpcomstaging.com/wp-content/uploads/2024/05/5665e-life-in-the-city-of-nagpur.jpg?fit=1000%2C619&ssl=1',
    description: 'Explore the orange city with its centrally located Zero Mile marker'
  },
];

const CitiesCarousel = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-heritage-cream">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-heritage-dark mb-4">Explore Popular Cities</h2>
          <p className="text-heritage-gray max-w-2xl mx-auto">
            Discover the rich cultural heritage of Maharashtra's most popular destinations.
            Click on any city to explore its iconic landmarks and hidden gems.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-10">
          {cities.map((city, index) => (
            <Link 
              key={city.id} 
              to={`/city/${city.id}`}
              className={`city-card relative flex-1 rounded-xl overflow-hidden h-[450px] transition-all duration-300 ${
                hoveredIndex === index 
                  ? 'md:flex-[2]' 
                  : hoveredIndex !== null 
                    ? 'md:flex-[0.5] opacity-70' 
                    : ''
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img 
                src={city.image} 
                alt={city.name} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                {/* <h3 className="text-2xl font-bold mb-2">{city.name}</h3> */}
                <h3 className="text-2xl font-bold mb-2 text-white">{city.name}</h3>

                <p className={`text-sm text-white/90 transition-all duration-300 ${
                  hoveredIndex === index ? 'opacity-100 max-h-24' : 'opacity-0 max-h-0 md:opacity-100 md:max-h-24'
                }`}>
                  {city.description}
                </p>
                <div className={`mt-4 inline-flex items-center text-heritage-mustard transition-all duration-300 ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0 md:opacity-100'
                }`}>
                  <span className="mr-2">Explore</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CitiesCarousel;
