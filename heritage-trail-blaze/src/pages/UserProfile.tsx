
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Camera, Award, BookOpen, Users, Image, Upload } from "lucide-react";

// Stamp interface
interface Stamp {
  id: string;
  cityId: string;
  cityName: string;
  dateVisited: string;
  image: string;
  type: 'heritage' | 'nature' | 'food' | 'adventure' | 'spiritual';
}

// Badge interface
interface UserBadge {
  id: string;
  name: string;
  description: string;
  image: string;
  dateEarned: string;
}

// User Photo interface
interface UserPhoto {
  id: string;
  caption: string;
  image: string;
  location: string;
  date: string;
  likes: number;
}

const StampCard = ({ stamp }: { stamp: Stamp }) => (
  <div className="relative group hover-scale">
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-end p-4">
      <div className="text-white">
        <h3 className="font-bold">{stamp.cityName}</h3>
        <p className="text-sm">{stamp.dateVisited}</p>
      </div>
    </div>
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="relative h-48">
        <img src={stamp.image} alt={stamp.cityName} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 z-20">
          <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
            {stamp.type}
          </Badge>
        </div>
      </div>
    </div>
  </div>
);

const BadgeCard = ({ badge }: { badge: UserBadge }) => (
  <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all hover-scale">
    <div className="relative mb-2">
      <div className="w-16 h-16 rounded-full flex items-center justify-center bg-heritage-cream">
        <img src={badge.image} alt={badge.name} className="w-12 h-12 object-contain" />
      </div>
    </div>
    <h3 className="font-bold text-center">{badge.name}</h3>
    <p className="text-xs text-heritage-gray text-center mt-1">{badge.description}</p>
    <p className="text-xs text-heritage-terracotta mt-3">Earned: {badge.dateEarned}</p>
  </div>
);

const PhotoCard = ({ photo }: { photo: UserPhoto }) => {
  const [liked, setLiked] = useState(false);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={photo.image} alt={photo.caption} className="w-full h-48 object-cover" />
      <div className="p-3">
        <p className="font-medium truncate">{photo.caption}</p>
        <div className="flex items-center justify-between mt-2 text-xs text-heritage-gray">
          <span className="flex items-center">
            <MapPin className="h-3 w-3 mr-1" /> {photo.location}
          </span>
          <button 
            onClick={() => setLiked(!liked)} 
            className={`flex items-center ${liked ? 'text-red-500' : ''}`}
          >
            {liked ? photo.likes + 1 : photo.likes} ♥
          </button>
        </div>
      </div>
    </div>
  );
};

const UserProfile = () => {
  // Dummy user data
  const user = {
    name: "Priya Sharma",
    username: "wanderlust_priya",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "Adventure seeker exploring the rich heritage of Maharashtra. Passionate about history, culture, and local cuisines.",
    location: "Mumbai, Maharashtra",
    joined: "March 2023",
    stats: {
      trips: 12,
      stamps: 18,
      badges: 7,
      followers: 142,
      following: 89
    }
  };
  
  // Sample stamps data
  const stamps: Stamp[] = [
    { 
      id: "1", 
      cityId: "mumbai", 
      cityName: "Mumbai", 
      dateVisited: "April 10, 2025", 
      image: "https://images.unsplash.com/photo-1562979314-bee7453e911c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      type: "heritage" 
    },
    // { 
    //   id: "2", 
    //   cityId: "pune", 
    //   cityName: "Pune", 
    //   dateVisited: "March 22, 2025", 
    //   image: "https://images.unsplash.com/photo-1558383817-8ebcfb56f8c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    //   type: "food" 
    // },
    // { 
    //   id: "3", 
    //   cityId: "nagpur", 
    //   cityName: "Nagpur", 
    //   dateVisited: "February 15, 2025", 
    //   image: "https://images.unsplash.com/photo-1626331640794-57aa1bc30891?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    //   type: "nature" 
    // },
    // { 
    //   id: "4", 
    //   cityId: "aurangabad", 
    //   cityName: "Aurangabad", 
    //   dateVisited: "January 5, 2025", 
    //   image: "https://images.unsplash.com/photo-1590395243068-eb288a6f6250?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    //   type: "adventure" 
    // },
    // { 
    //   id: "5", 
    //   cityId: "nashik", 
    //   cityName: "Nashik", 
    //   dateVisited: "December 18, 2024", 
    //   image: "https://images.unsplash.com/photo-1604917877934-63c7772cc0cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    //   type: "spiritual" 
    // },
    // { 
    //   id: "6", 
    //   cityId: "kolhapur", 
    //   cityName: "Kolhapur", 
    //   dateVisited: "November 30, 2024", 
    //   image: "https://images.unsplash.com/photo-1621317962819-067a7dea4d6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    //   type: "heritage" 
    // }
  ];
  
  // Sample badges data
  const badges: UserBadge[] = [
    {
      id: "1",
      name: "Heritage Explorer",
      description: "Visited 5 heritage sites across Maharashtra",
      image: "https://images.unsplash.com/photo-1674644244097-2dc0488743e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      dateEarned: "April 15, 2025"
    },
    {
      id: "2",
      name: "Foodie Adventurer",
      description: "Tried 10 local dishes across the state",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      dateEarned: "March 22, 2025"
    },
    {
      id: "3",
      name: "Photography Pro",
      description: "Shared 20 photos that received 100+ likes",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      dateEarned: "February 18, 2025"
    },
    {
      id: "4",
      name: "Adventure Seeker",
      description: "Completed 3 adventure trails",
      image: "https://images.unsplash.com/photo-1682685797661-9e0c87f59c60?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      dateEarned: "January 30, 2025"
    },
    {
      id: "5",
      name: "Nature Enthusiast",
      description: "Explored 4 natural parks and sanctuaries",
      image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      dateEarned: "December 12, 2024"
    },
    {
      id: "6",
      name: "Cultural Maven",
      description: "Attended 5 cultural festivals or events",
      image: "https://images.unsplash.com/photo-1528123792086-7edf3f0fb9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      dateEarned: "November 5, 2024"
    },
    {
      id: "7",
      name: "Tribal Connection",
      description: "Joined and participated in 3 travel tribes",
      image: "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      dateEarned: "October 20, 2024"
    }
  ];
  
  // Sample photos data
  const photos: UserPhoto[] = [
    {
      id: "1",
      caption: "Sunrise at Gateway of India",
      image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      location: "Mumbai",
      date: "April 10, 2025",
      likes: 48
    },
    {
      id: "2",
      caption: "Historical architecture at Shaniwar Wada",
      image: "https://images.unsplash.com/photo-1623075559810-2c3619cb18c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      location: "Pune",
      date: "March 22, 2025",
      likes: 35
    },
    {
      id: "3",
      caption: "Zero Mile Stone at sunset",
      image: "https://images.unsplash.com/photo-1609949424499-31871d858d69?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      location: "Nagpur",
      date: "February 15, 2025",
      likes: 29
    },
    {
      id: "4",
      caption: "Tea plantations near Nashik",
      image: "https://images.unsplash.com/photo-1626015253889-bf83bebfff18?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      location: "Nashik",
      date: "January 5, 2025",
      likes: 52
    },
    {
      id: "5",
      caption: "Street food delights in Kolhapur",
      image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      location: "Kolhapur",
      date: "December 18, 2024",
      likes: 41
    },
    {
      id: "6",
      caption: "Cave paintings at Ajanta",
      image: "https://images.unsplash.com/photo-1590395243068-eb288a6f6250?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      location: "Aurangabad",
      date: "November 30, 2024",
      likes: 63
    }
  ];

  // Passport design inspired elements
  const passportCoverStyle = {
    backgroundImage: "linear-gradient(135deg, #4A2F17 0%, #70482A 100%)",
    color: "#E2C799",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
    position: "relative" as const
  };
  
  const passportEmblemStyle = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    opacity: 0.3
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-flash">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Passport Cover Design */}
        <div style={passportCoverStyle} className="p-8 mb-8">
          <div style={passportEmblemStyle} className="text-center">
            <div className="border-4 border-heritage-mustard/30 rounded-full p-8">
              <MapPin className="h-16 w-16" />
            </div>
          </div>
          
          <div className="text-center mb-8 relative z-10">
            <h1 className="text-3xl font-serif font-bold tracking-wider mb-1">TRAVEL PASSPORT</h1>
            <p className="text-heritage-mustard/80 uppercase tracking-widest text-sm">MAHARASHTRA HERITAGE TRAIL</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <Avatar className="h-24 w-24 border-4 border-heritage-mustard">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
              <p className="text-heritage-mustard/80 mb-3">@{user.username}</p>
              
              <p className="mb-4 max-w-md text-sm">{user.bio}</p>
              
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {user.location}
                </div>
                <div>
                  Member since {user.joined}
                </div>
              </div>
            </div>
            
            <div className="md:text-right space-y-2">
              <Button className="bg-heritage-mustard text-heritage-dark hover:bg-heritage-mustard/90 w-full md:w-auto">
                Edit Profile
              </Button>
              <div className="grid grid-cols-3 gap-3 md:gap-5 mt-4 text-center">
                <div>
                  <div className="text-xl font-bold">{user.stats.trips}</div>
                  <div className="text-xs text-heritage-mustard/70">Trips</div>
                </div>
                <div>
                  <div className="text-xl font-bold">{user.stats.stamps}</div>
                  <div className="text-xs text-heritage-mustard/70">Stamps</div>
                </div>
                <div>
                  <div className="text-xl font-bold">{user.stats.badges}</div>
                  <div className="text-xs text-heritage-mustard/70">Badges</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Profile Content Tabs */}
        <Tabs defaultValue="stamps" className="w-full">
          <TabsList className="mb-8 w-full justify-start overflow-x-auto">
            <TabsTrigger value="stamps" className="flex items-center">
              <Award className="mr-2 h-4 w-4" />
              Stamps & Badges
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center">
              <Image className="mr-2 h-4 w-4" />
              My Gallery
            </TabsTrigger>
            <TabsTrigger value="tribes" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              My Tribes
            </TabsTrigger>
            <TabsTrigger value="blogs" className="flex items-center">
              <BookOpen className="mr-2 h-4 w-4" />
              My Blogs
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="stamps" className="mt-0">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-heritage-dark">My Travel Stamps</h2>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Camera className="mr-2 h-4 w-4" />
                    Check in at a location
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {stamps.map(stamp => (
                  <StampCard key={stamp.id} stamp={stamp} />
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-heritage-dark">My Badges</h2>
                <Button size="sm" variant="outline">
                  View all badges
                </Button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {badges.map(badge => (
                  <BadgeCard key={badge.id} badge={badge} />
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="gallery" className="mt-0">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-heritage-dark">My Gallery</h2>
                <Button className="bg-heritage-terracotta hover:bg-heritage-terracotta/90">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Photos
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {photos.map(photo => (
                  <PhotoCard key={photo.id} photo={photo} />
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Button variant="outline">Load More Photos</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tribes" className="mt-0">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-heritage-dark">My Tribes</h2>
                <Link to="/tribes">
                  <Button size="sm" variant="outline">
                    Explore More Tribes
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Sample tribe memberships */}
                <div className="bg-blue-venice/5 rounded-lg p-6 hover:shadow-lg transition-all">
                  <div className="flex justify-between mb-3">
                    <h3 className="text-xl font-bold text-blue-mystic">Solo Backpackers Maharashtra</h3>
                    <Badge className="bg-green-turf">Active</Badge>
                  </div>
                  <p className="text-blue-mystic/80 mb-4">You joined this tribe on March 15, 2025</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-mystic/60">1250 members</span>
                    <Button size="sm" className="bg-blue-venice hover:bg-blue-venice/90">
                      Open Chat
                    </Button>
                  </div>
                </div>
                
                <div className="bg-blue-venice/5 rounded-lg p-6 hover:shadow-lg transition-all">
                  <div className="flex justify-between mb-3">
                    <h3 className="text-xl font-bold text-blue-mystic">Heritage Explorers</h3>
                    <Badge className="bg-green-turf">Active</Badge>
                  </div>
                  <p className="text-blue-mystic/80 mb-4">You joined this tribe on February 10, 2025</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-mystic/60">2100 members</span>
                    <Button size="sm" className="bg-blue-venice hover:bg-blue-venice/90">
                      Open Chat
                    </Button>
                  </div>
                </div>
                
                <div className="bg-blue-venice/5 rounded-lg p-6 hover:shadow-lg transition-all">
                  <div className="flex justify-between mb-3">
                    <h3 className="text-xl font-bold text-blue-mystic">Food Trail Maharashtra</h3>
                    <Badge className="bg-green-turf">Active</Badge>
                  </div>
                  <p className="text-blue-mystic/80 mb-4">You joined this tribe on January 5, 2025</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-mystic/60">3200 members</span>
                    <Button size="sm" className="bg-blue-venice hover:bg-blue-venice/90">
                      Open Chat
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="blogs" className="mt-0">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-heritage-dark">My Blog Posts</h2>
                <Link to="/blogs">
                  <Button className="bg-heritage-terracotta hover:bg-heritage-terracotta/90">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Write New Post
                  </Button>
                </Link>
              </div>
              
              <div className="space-y-6">
                {/* Sample blog posts */}
                <div className="border-b pb-6">
                  <h3 className="text-xl font-bold hover:text-heritage-terracotta">
                    <Link to="/blogs/1">A Weekend in Pune's Old City</Link>
                  </h3>
                  <div className="flex items-center text-heritage-gray text-sm my-2">
                    <span>April 15, 2025</span>
                    <span className="mx-2">•</span>
                    <span>Heritage, History</span>
                  </div>
                  <p className="text-heritage-gray mb-4">
                    Exploring the narrow lanes and hidden gems of Pune's historical center revealed centuries of stories...
                  </p>
                  <div className="flex gap-4">
                    <span className="text-sm text-heritage-terracotta">42 likes</span>
                    <span className="text-sm text-heritage-gray">12 comments</span>
                  </div>
                </div>
                
                <div className="border-b pb-6">
                  <h3 className="text-xl font-bold hover:text-heritage-terracotta">
                    <Link to="/blogs/2">Street Food Adventure in Mumbai</Link>
                  </h3>
                  <div className="flex items-center text-heritage-gray text-sm my-2">
                    <span>March 22, 2025</span>
                    <span className="mx-2">•</span>
                    <span>Food, Culture</span>
                  </div>
                  <p className="text-heritage-gray mb-4">
                    From vada pav to pav bhaji, my culinary journey through Mumbai's bustling streets was a feast for all senses...
                  </p>
                  <div className="flex gap-4">
                    <span className="text-sm text-heritage-terracotta">38 likes</span>
                    <span className="text-sm text-heritage-gray">9 comments</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold hover:text-heritage-terracotta">
                    <Link to="/blogs/3">Nagpur: Beyond Oranges</Link>
                  </h3>
                  <div className="flex items-center text-heritage-gray text-sm my-2">
                    <span>February 10, 2025</span>
                    <span className="mx-2">•</span>
                    <span>Travel, History</span>
                  </div>
                  <p className="text-heritage-gray mb-4">
                    Discovering the cultural heritage and modern attractions that make Nagpur much more than just the Orange City...
                  </p>
                  <div className="flex gap-4">
                    <span className="text-sm text-heritage-terracotta">29 likes</span>
                    <span className="text-sm text-heritage-gray">7 comments</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserProfile;
