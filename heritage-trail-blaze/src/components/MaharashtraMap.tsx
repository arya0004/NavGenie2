
// import { useState, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { MapPin } from 'lucide-react';
// import { Card, CardContent } from '@/components/ui/card';

// const cityData = [
//   {
//     id: 'mumbai',
//     name: 'Mumbai',
//     position: { top: '40%', left: '15%' },
//     image: 'https://images.unsplash.com/photo-1587135941948-670b381f08ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     description: 'Mumbai, the financial capital of India, boasts iconic landmarks such as the Gateway of India and the historic Chhatrapati Shivaji Terminus.'
//   },
//   {
//     id: 'pune',
//     name: 'Pune',
//     position: { top: '55%', left: '25%' },
//     image: 'https://images.unsplash.com/photo-1598977054780-2dc700fdc732?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     description: 'Known as the "Oxford of the East," Pune is home to the spectacular Aga Khan Palace and Shaniwar Wada, the seat of the Peshwa rulers.'
//   },
//   {
//     id: 'nagpur',
//     name: 'Nagpur',
//     position: { top: '60%', left: '72%' },
//     image: 'https://images.unsplash.com/photo-1614136766262-a78704d331f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     description: 'Nagpur, the winter capital of Maharashtra, is famous for its oranges and the Zero Mile marker, considered the geographical center of India.'
//   },
// ];

// const MaharashtraMap = () => {
//   const [hoveredCity, setHoveredCity] = useState<string | null>(null);
//   const [selectedCity, setSelectedCity] = useState<string | null>(null);
//   const popupRef = useRef<HTMLDivElement>(null);

//   const handleCityClick = (cityId: string) => {
//     setSelectedCity(cityId === selectedCity ? null : cityId);
//   };

//   return (
//     <div id="discover" className="relative w-full bg-white py-16">
//       <div className="container mx-auto text-center mb-12">
//         <h2 className="text-3xl md:text-4xl font-bold text-green-turf mb-4">Discover Maharashtra's Heritage</h2>
//         <p className="text-heritage-gray max-w-2xl mx-auto">
//           Explore the rich cultural heritage of Maharashtra through its iconic cities. 
//           Click on the markers to learn more about each destination.
//         </p>
//       </div>
      
//       <div className="relative w-full max-w-4xl mx-auto h-[500px] bg-heritage-cream rounded-lg shadow-lg overflow-hidden">
//         {/* Map Background */}
//         <div className="absolute inset-0">
//           <img 
//             src="https://upload.wikimedia.org/wikipedia/commons/9/9f/Maharashtra_location_map.svg" 
//             alt="Maharashtra Map" 
//             className="w-full h-full object-contain"
//           />
//         </div>
        
//         {/* City Markers */}
//         {cityData.map((city) => (
//           <div 
//             key={city.id}
//             className="absolute cursor-pointer transition-transform hover:scale-125 z-10"
//             style={{ top: city.position.top, left: city.position.left }}
//             onMouseEnter={() => !selectedCity && setHoveredCity(city.id)}
//             onMouseLeave={() => !selectedCity && setHoveredCity(null)}
//             onClick={() => handleCityClick(city.id)}
//           >
//             <MapPin 
//               size={32} 
//               className="text-green-turf filter drop-shadow-md"
//               fill={hoveredCity === city.id || selectedCity === city.id ? "#48817A" : "transparent"}
//             />
//             <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold bg-white/80 px-2 py-1 rounded shadow-sm">
//               {city.name}
//             </span>
//           </div>
//         ))}
        
//         {/* City Info Popup - Now stays visible when clicked */}
//         {(hoveredCity || selectedCity) && (
//           <div 
//             ref={popupRef}
//             className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-300 ${
//               selectedCity ? 'scale-100 opacity-100' : 'scale-95 opacity-90'
//             }`}
//           >
//             <Card className="w-72 shadow-lg border border-green-jade/20">
//               <CardContent className="p-4">
//                 {cityData.filter(city => city.id === (selectedCity || hoveredCity)).map(city => (
//                   <div key={city.id} className="flex flex-col items-center">
//                     <h3 className="font-bold text-lg text-green-jade mb-2">{city.name}</h3>
//                     <img 
//                       src={city.image} 
//                       alt={city.name} 
//                       className="w-full h-32 object-cover rounded-md mb-3"
//                     />
//                     <p className="text-sm text-heritage-gray mb-3">{city.description}</p>
//                     <Link 
//                       to={`/city/${city.id}`}
//                       className="bg-green-jade text-white px-4 py-2 rounded hover:bg-green-jade/90 transition-colors text-sm"
//                     >
//                       Explore {city.name}
//                     </Link>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MaharashtraMap;
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import monuIcon from "@/assets/monu.png"; // Importing the custom icon

const cityData = [
  {
    id: "mumbai",
    name: "Mumbai",
    position: { top: "44%", left: "24%" }, // adjusted
    image:
      "https://www.shutterstock.com/image-photo/mumbai-maharashtra-india-09102023-wide-260nw-2377669253.jpg",
    description:
      "Mumbai, the financial capital of India, boasts iconic landmarks such as the Gateway of India and the historic Chhatrapati Shivaji Terminus.",
  },
  {
    id: "pune",
    name: "Pune",
    position: { top: "51%", left: "31.5%" }, // adjusted
    image:
      "https://thumbs.dreamstime.com/z/heritage-monument-aga-khan-palace-pune-heritage-monument-aga-khan-palace-pune-maharashtra-india-268637742.jpg",
    description:
      'Known as the "Oxford of the East," Pune is home to the spectacular Aga Khan Palace and Shaniwar Wada, the seat of the Peshwa rulers.',
  },
  {
    id: "nagpur",
   name: "Nagpur",
    position: { top: "15%", left: "71.5%" }, // adjusted
    image:
      "https://static.toiimg.com/thumb/114013147/Double-decker-flyover-in-Nagpur.jpg?width=1200&height=900",
    description:
      "Nagpur, the winter capital of Maharashtra, is famous for its oranges and the Zero Mile marker, considered the geographical center of India.",
  },
];

const MaharashtraMap = () => {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleCityClick = (cityId: string) => {
    setSelectedCity(cityId === selectedCity ? null : cityId);
  };

  return (
    <div id="maharashtra-map" className="relative w-full bg-white py-16">
      <div className="container mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-green-turf mb-4">
          Discover Maharashtra's Heritage
        </h2>
      </div>

      <div className="relative w-full max-w-4xl mx-auto h-[530px] bg-heritage-cream rounded-lg shadow-lg overflow-hidden">
        {/* Map Background */}
        <div className="absolute inset-0">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Maharashtra_Divisions_Eng.svg"
            alt="Maharashtra Map"
            className="w-full h-full object-contain"
          />
        </div>

        {/* City Markers */}
        {cityData.map((city) => (
          <div
            key={city.id}
            className="absolute cursor-pointer z-10 transition-transform hover:scale-125"
            style={{
              top: city.position.top,
              left: city.position.left,
              transform: "translate(-50%, -100%)",
            }}
            onMouseEnter={() => !selectedCity && setHoveredCity(city.id)}
            onMouseLeave={() => !selectedCity && setHoveredCity(null)}
            onClick={() => handleCityClick(city.id)}
          >
            <img
              src={monuIcon}
              alt={`${city.name} Icon`}
              className="w-6 h-6 drop-shadow-md"
            />
            <span className="absolute top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold bg-white/80 px-2 py-1 rounded shadow-sm">
              {city.name}
            </span>
          </div>
        ))}

        {/* City Info Popup */}
        {(hoveredCity || selectedCity) && (
          <div
            ref={popupRef}
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-300 ${
              selectedCity ? "scale-100 opacity-100" : "scale-95 opacity-90"
            }`}
          >
            <Card className="w-72 shadow-lg border border-green-jade/20">
              <CardContent className="p-4">
                {cityData
                  .filter(
                    (city) => city.id === (selectedCity || hoveredCity)
                  )
                  .map((city) => (
                    <div key={city.id} className="flex flex-col items-center">
                      <h3 className="font-bold text-lg text-green-jade mb-2">
                        {city.name}
                      </h3>
                      <img
                        src={city.image}
                        alt={city.name}
                        className="w-full h-32 object-cover rounded-md mb-3"
                      />
                      <p className="text-sm text-heritage-gray mb-3">
                        {city.description}
                      </p>
                      <Link
                        to={`/city/${city.id}`}
                        className="bg-green-jade text-white px-4 py-2 rounded hover:bg-green-jade/90 transition-colors text-sm"
                      >
                        Explore {city.name}
                      </Link>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaharashtraMap;
