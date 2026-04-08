
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Star, Calendar, Image, Bookmark } from "lucide-react";
import CityGallery from "@/components/CityGallery";
import { useToast } from "@/components/ui/use-toast";

const cityData = {
  mumbai: {
    name: "Mumbai",
    title: "Gateway to India's Rich Heritage",
    description: "Discover the vibrant history and architectural marvels of Mumbai, where colonial heritage meets modern India.",
    heroImage: "https://images.unsplash.com/photo-1562979314-bee7453e911c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    heritages: [
      {
        id: "gateway",
        name: "Gateway of India",
        description: "Built in 1924, the Gateway of India is an iconic monument overlooking the Arabian Sea. This yellow basalt structure was erected to commemorate the visit of King George V and Queen Mary to Mumbai.",
        image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "cst",
        name: "Chhatrapati Shivaji Terminus",
        description: "A UNESCO World Heritage Site, this historic railway station is known for its remarkable Victorian Gothic Revival architecture with elements of traditional Indian architecture.",
        image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "elephanta",
        name: "Elephanta Caves",
        description: "Located on Elephanta Island, these ancient cave temples dedicated to Lord Shiva date back to the 5th-7th centuries and feature intricate stone carvings.",
        image: "https://images.unsplash.com/photo-1590080552494-dcda538fa459?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ],
    trending: [
      {
        id: "trending1",
        title: "Marine Drive Sunset Walk",
        type: "Activity",
        rating: 4.8,
        reviews: 312,
        image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "trending2",
        title: "Mumbai Street Food Tour",
        type: "Food Experience",
        rating: 4.9,
        reviews: 186,
        image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "trending3",
        title: "Bollywood Studio Tour",
        type: "Cultural Experience",
        rating: 4.5,
        reviews: 203,
        image: "https://images.unsplash.com/photo-1588421357574-87938a86fa28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ],
    blogs: [
      {
        id: "1",
        title: "A Day in Colonial Mumbai",
        excerpt: "Exploring the architectural wonders of British-era Mumbai and the stories they tell.",
        image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        author: "Priya Sharma",
        date: "April 15, 2025"
      },
      {
        id: "2",
        title: "Mumbai Street Food Guide",
        excerpt: "From vada pav to bhel puri, discover the amazing flavors of Mumbai's street food scene.",
        image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        author: "Raj Mehta",
        date: "April 10, 2025"
      },
      {
        id: "3",
        title: "Hidden Treasures of South Mumbai",
        excerpt: "Discovering lesser-known historical sites and cultural gems in South Mumbai.",
        image: "https://images.unsplash.com/photo-1566553253563-2696f41f923a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        author: "Arjun Kapoor",
        date: "April 5, 2025"
      }
    ]
  },
  pune: {
    name: "Pune",
    title: "Cultural Capital of Maharashtra",
    description: "Explore Pune's rich Maratha heritage and historical sites that tell the story of the city's royal past.",
    heroImage: "https://c8.alamy.com/comp/P3EW11/garden-of-shaniwar-wada-palace-pune-india-P3EW11.jpg",
    heritages: [
      {
        id: "shaniwada",
        name: "Shaniwar Wada",
        description: "Built in 1732, Shaniwar Wada was the seat of the Peshwa rulers of the Maratha Empire. This fortified palace features impressive architecture and historical significance.",
        image: "https://c8.alamy.com/comp/P3EW11/garden-of-shaniwar-wada-palace-pune-india-P3EW11.jpg"
      },
      {
        id: "agakhan",
        name: "Aga Khan Palace",
        description: "Built in 1892, the Aga Khan Palace holds significance for its connection to Mahatma Gandhi, who was detained here during the Quit India Movement. Today, it houses a memorial and museum.",
        image: "https://imgcld.yatra.com/ytimages/image/upload/v1481278130/Pune_Aga_Khan_Palace.jpg"
      },
      {
        id: "sinhagarh",
        name: "Sinhagad Fort",
        description: "Located on a hilltop, this ancient fortress has witnessed many historic battles and offers panoramic views of the surrounding landscape.",
        image: "https://th.bing.com/th/id/OIP.BOYB91DluJr_X5L7sw8N-gHaEK?rs=1&pid=ImgDetMain"
      }
    ],
    trending: [
      {
        id: "trending1",
        title: "Pune Heritage Walk",
        type: "Guided Tour",
        rating: 4.7,
        reviews: 156,
        image: "https://images.unsplash.com/photo-1623075559810-2c3619cb18c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "trending2",
        title: "Osho Meditation Retreat",
        type: "Wellness Experience",
        rating: 4.6,
        reviews: 142,
        image: "https://images.unsplash.com/photo-1591101046554-efa60e66f362?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "trending3",
        title: "Pune Food Trail",
        type: "Culinary Tour",
        rating: 4.9,
        reviews: 189,
        image: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ],
    blogs: [
      {
        id: "4",
        title: "Exploring Pune's Peshwa History",
        excerpt: "Walking through the corridors of power in the once-mighty Maratha Empire.",
        image: "https://images.unsplash.com/photo-1623075559810-2c3619cb18c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        author: "Aditya Kulkarni",
        date: "April 8, 2025"
      },
      {
        id: "5",
        title: "Student Life in Pune",
        excerpt: "Experiencing the vibrant educational hub that has earned Pune the title of 'Oxford of the East'.",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        author: "Sneha Desai",
        date: "April 3, 2025"
      },
      {
        id: "6",
        title: "Weekend Getaways from Pune",
        excerpt: "Perfect short trips from Pune to explore Maharashtra's natural beauty.",
        image: "https://th.bing.com/th/id/OIP.BOYB91DluJr_X5L7sw8N-gHaEK?rs=1&pid=ImgDetMain",
        author: "Vikram Deshpande",
        date: "March 29, 2025"
      }
    ]
  },
  nagpur: {
    name: "Nagpur",
    title: "Heart of India's Orange Country",
    description: "Visit Nagpur, known for its central location and rich cultural heritage spanning centuries of history.",
    heroImage: "https://images.unsplash.com/photo-1626331640794-57aa1bc30891?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    heritages: [
      {
        id: "zeromile",
        name: "Zero Mile Stone",
        description: "The Zero Mile Stone is considered the geographical center of India. This historic monument was built during British colonial rule and marks the central point from which distances are measured.",
        image: "https://images.unsplash.com/photo-1609949424499-31871d858d69?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "deekshabhoomi",
        name: "Deekshabhoomi",
        description: "Deekshabhoomi is a sacred monument of Buddhism where Dr. B.R. Ambedkar converted to Buddhism along with his followers in 1956. The stupa is one of the largest hollow stupas in Asia.",
        image: "https://images.unsplash.com/photo-1621317962819-067a7dea4d6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "ramtek",
        name: "Ramtek Temple",
        description: "Located on a hill, the Ramtek Temple is believed to be where Lord Rama rested during his exile. The temple offers beautiful views and is an important pilgrimage site.",
        image: "https://images.unsplash.com/photo-1602391833977-358a52198938?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ],
    trending: [
      {
        id: "trending1",
        title: "Orange Orchard Visit",
        type: "Rural Experience",
        rating: 4.6,
        reviews: 98,
        image: "https://images.unsplash.com/photo-1618167383031-9be9957c265e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "trending2",
        title: "Dragon Palace Buddhist Temple",
        type: "Spiritual Visit",
        rating: 4.8,
        reviews: 112,
        image: "https://images.unsplash.com/photo-1621317962819-067a7dea4d6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "trending3",
        title: "Nagpur Food Trail",
        type: "Culinary Tour",
        rating: 4.7,
        reviews: 145,
        image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ],
    blogs: [
      {
        id: "7",
        title: "The Orange Chronicles of Nagpur",
        excerpt: "Exploring the orchards and agricultural heritage of the Orange City.",
        image: "https://images.unsplash.com/photo-1618167383031-9be9957c265e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        author: "Anil Patil",
        date: "April 12, 2025"
      },
      {
        id: "8",
        title: "Center of India: Zero Mile Significance",
        excerpt: "Understanding the historical and geographical importance of Nagpur's Zero Mile marker.",
        image: "https://images.unsplash.com/photo-1609949424499-31871d858d69?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        author: "Deepika Sharma",
        date: "April 7, 2025"
      },
      {
        id: "9",
        title: "Spiritual Journey Through Nagpur",
        excerpt: "Exploring the Buddhist heritage and spiritual sites that define Nagpur's religious landscape.",
        image: "https://images.unsplash.com/photo-1621317962819-067a7dea4d6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        author: "Sanjay Shinde",
        date: "March 30, 2025"
      }
    ]
  }
};

const CityPage = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const [city, setCity] = useState<any>(null);
  const [activeSection, setActiveSection] = useState("heritage-sites");
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (cityId && cityId in cityData) {
      setCity(cityData[cityId as keyof typeof cityData]);
    }
  }, [cityId]);

  const handleAddToItinerary = (site: string) => {
    toast({
      description: `${site} added to your itinerary!`,
    });
  };

  const handleBookmark = (item: string) => {
    toast({
      description: `${item} saved to your bookmarks!`,
    });
  };

  if (!city) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-xl">City not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  const handleExploreClick = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* City Hero */}
      <div className="relative h-[500px]">
        <img 
          src={city.heroImage} 
          alt={city.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">{city.name}</h1>
            <h2 className="text-xl md:text-2xl mb-4 text-heritage-mustard">{city.title}</h2>
            <p className="max-w-2xl mb-6 text-white/80">{city.description}</p>
            <div className="flex gap-4">
              <Button 
                onClick={() => handleExploreClick('heritage-sites')}
                className="bg-heritage-terracotta hover:bg-heritage-terracotta/90 text-white"
              >
                Explore Heritage Sites
              </Button>
              <Link to="/plan-trip">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-heritage-dark">
                  Plan This Trip
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* City Navigation */}
      <div className="sticky top-[72px] bg-white shadow-sm z-40">
        <div className="container mx-auto">
          <div className="flex overflow-x-auto py-4 px-4 space-x-6">
            <a 
              href="#heritage-sites" 
              onClick={(e) => {
                e.preventDefault();
                handleExploreClick('heritage-sites');
              }}
              className={`flex items-center space-x-2 whitespace-nowrap transition-colors ${
                activeSection === 'heritage-sites' ? 'text-heritage-terracotta' : 'text-heritage-dark hover:text-heritage-terracotta'
              }`}
            >
              <MapPin size={18} />
              <span>Heritage Sites</span>
            </a>
            <a 
              href="#gallery" 
              onClick={(e) => {
                e.preventDefault();
                handleExploreClick('gallery');
              }}
              className={`flex items-center space-x-2 whitespace-nowrap transition-colors ${
                activeSection === 'gallery' ? 'text-heritage-terracotta' : 'text-heritage-dark hover:text-heritage-terracotta'
              }`}
            >
              <Image size={18} />
              <span>Gallery</span>
            </a>
            <a 
              href="#trending" 
              onClick={(e) => {
                e.preventDefault();
                handleExploreClick('trending');
              }}
              className={`flex items-center space-x-2 whitespace-nowrap transition-colors ${
                activeSection === 'trending' ? 'text-heritage-terracotta' : 'text-heritage-dark hover:text-heritage-terracotta'
              }`}
            >
              <Star size={18} />
              <span>Trending</span>
            </a>
            <a 
              href="#blogs" 
              onClick={(e) => {
                e.preventDefault();
                handleExploreClick('blogs');
              }}
              className={`flex items-center space-x-2 whitespace-nowrap transition-colors ${
                activeSection === 'blogs' ? 'text-heritage-terracotta' : 'text-heritage-dark hover:text-heritage-terracotta'
              }`}
            >
              <Calendar size={18} />
              <span>Blogs</span>
            </a>
          </div>
        </div>
      </div>

      {/* Heritage Sites */}
      <section id="heritage-sites" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-heritage-dark mb-3">Heritage Sites in {city.name}</h2>
            <p className="text-heritage-gray max-w-2xl mx-auto">
              Explore the iconic landmarks and hidden gems that make {city.name} a treasure trove of cultural heritage.
            </p>
          </div>

          <div className="space-y-20">
            {city.heritages.map((site: any, index: number) => (
              <div 
                key={site.id}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-8 items-center`}
              >
                <div className="w-full lg:w-1/2">
                  <img 
                    src={site.image} 
                    alt={site.name}
                    className="w-full h-[350px] object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div className="w-full lg:w-1/2">
                  <h3 className="text-2xl font-bold text-heritage-terracotta mb-3">
                    {site.name}
                  </h3>
                  <p className="text-heritage-gray mb-6">
                    {site.description}
                  </p>
                  <div className="flex gap-4">
                    <Button size="sm" className="bg-heritage-dark hover:bg-heritage-dark/90 text-white">
                      Visit Details
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-heritage-terracotta text-heritage-terracotta hover:bg-heritage-terracotta hover:text-white"
                      onClick={() => handleAddToItinerary(site.name)}
                    >
                      Add to Itinerary
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-8 bg-gray-flash">
        <CityGallery cityId={cityId || ''} cityName={city.name} />
      </section>

      {/* Trending Section */}
      <section id="trending" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-heritage-dark mb-3">Trending in {city.name}</h2>
            <p className="text-heritage-gray max-w-2xl mx-auto">
              The most popular experiences and activities recommended by fellow travelers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {city.trending && city.trending.map((item: any) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-white/80 backdrop-blur-sm hover:bg-white"
                      onClick={() => handleBookmark(item.title)}
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-heritage-terracotta">{item.type}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="font-medium">{item.rating}</span>
                      <span className="text-heritage-gray text-sm ml-1">({item.reviews})</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  
                  <div className="flex justify-between items-center">
                    <Button 
                      size="sm" 
                      className="bg-heritage-terracotta hover:bg-heritage-terracotta/90"
                    >
                      View Details
                    </Button>
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleAddToItinerary(item.title)}
                    >
                      Add to Itinerary
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section id="blogs" className="py-16 bg-gray-flash">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-heritage-dark mb-3">Travel Stories from {city.name}</h2>
            <p className="text-heritage-gray max-w-2xl mx-auto">
              Read about experiences, tips, and recommendations from travelers who've explored {city.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {city.blogs && city.blogs.map((blog: any) => (
              <Link key={blog.id} to={`/blogs/${blog.id}`} className="block">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all h-full">
                  <img 
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2 hover:text-heritage-terracotta transition-colors">{blog.title}</h3>
                    <p className="text-heritage-gray mb-4">{blog.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-heritage-gray">
                        By {blog.author}
                      </div>
                      <div className="text-sm text-heritage-gray">
                        {blog.date}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/blogs">
              <Button className="bg-heritage-dark hover:bg-heritage-dark/90">
                Read More Stories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="mt-12 text-center">
        <Link 
          to="/plan-trip"
          className="bg-heritage-terracotta text-white px-6 py-3 rounded-md hover:bg-heritage-terracotta/90 inline-flex items-center"
        >
          Plan Your Trip to {city.name}
          <ArrowRight size={18} className="ml-2" />
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default CityPage;
