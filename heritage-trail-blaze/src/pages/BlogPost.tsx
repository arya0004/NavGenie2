
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Share2, ArrowLeft, Bookmark } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
}

// Mock database of blog posts for demonstration
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Hidden Gems of Pune's Old City",
    author: "Priya Sharma",
    date: "April 15, 2025",
    excerpt: "Exploring the narrow lanes and historical wonders of Pune's heart...",
    content: "Pune's old city is a labyrinth of narrow streets, ancient temples, and historical wonders that many visitors overlook. As you wander through the Kasba Peth area, you'll discover centuries-old architecture still vibrant with daily life. The Shaniwar Wada fortress, once the seat of the Peshwa rulers, stands as a testament to the city's rich heritage, while nearby, the Lal Mahal offers glimpses into Shivaji Maharaj's early life.\n\nBeyond the well-known landmarks, there are hidden treasures like the Tambat Ali (Copper Smith Colony), where artisans still practice traditional copper crafting techniques passed down through generations. The rhythmic sound of hammers shaping metal creates a mesmerizing backdrop as you explore shops filled with gleaming copper vessels.\n\nFood enthusiasts will delight in discovering small eateries serving authentic Puneri cuisine, from spicy misal pav to sweet mastani desserts. Many of these establishments have been run by the same families for decades, preserving recipes that can't be found elsewhere.\n\nThe spiritual heart of old Pune reveals itself through ancient temples like the Pataleshwar Cave Temple, carved from a single rock in the 8th century. Nearby, the Dagdusheth Halwai Ganpati Temple pulses with devotees throughout the year, its golden ornaments glittering under ceremonial lights.\n\nAs you explore these hidden corners of Pune, you'll connect with a city that beautifully balances its historical roots with its contemporary identity as Maharashtra's cultural capital.",
    image: "https://images.unsplash.com/photo-1623075559810-2c3619cb18c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "heritage",
    tags: ["pune", "history", "food", "architecture"]
  },
  {
    id: "2",
    title: "A Food Trail Through Mumbai",
    author: "Raj Mehta",
    date: "April 14, 2025",
    excerpt: "Discovering the best street food spots in Mumbai's bustling streets...",
    content: "Mumbai's vibrant street food scene is legendary across India, offering an incredible variety of flavors that tell the story of this diverse metropolis. From the iconic vada pav – often called Mumbai's burger – to the buttery pav bhaji that originated as a late-night meal for textile mill workers, the city's street food is deeply connected to its history and communities.\n\nBegin your food adventure at Chowpatty Beach, where stalls serve up Mumbai classics like bhel puri and sev puri – crunchy, tangy snacks that perfectly embody the city's bold flavor combinations. Nearby, Mohammed Ali Road comes alive especially during evening hours, with smoke billowing from grills cooking succulent kebabs and aromatic curries.\n\nFor the authentic vada pav experience, locals swear by Ashok Vada Pav in Dadar, where this simple potato fritter sandwich is elevated to culinary perfection through secret spice blends. In contrast, Swati Snacks in Tardeo offers a more refined take on street classics, served in a restaurant setting but maintaining authentic flavors.\n\nThe bustling lanes of Colaba reveal international influences on Mumbai's cuisine, from Iranian cafes serving brun maska and chai to Parsi establishments with their distinctive berry pulao. Don't miss the legendary Bademiya, where late-night kebabs have satisfied hungry Mumbaikars for generations.\n\nFinish your food trail with something sweet – perhaps kulfi from a street vendor or the creamy, cardamom-infused kesar pista milkshake from Haji Ali Juice Center, a Mumbai institution since 1937.\n\nWhat makes Mumbai's street food truly special isn't just the flavors but the experience – eating alongside locals from all walks of life, watching skilled vendors perform culinary magic on simple stoves, and absorbing the endless energy of this magnificent city.",
    image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "food",
    tags: ["mumbai", "street-food", "culinary", "local"]
  },
  {
    id: "3",
    title: "Nagpur: Orange City Chronicles",
    author: "Amit Patel",
    date: "April 13, 2025",
    excerpt: "A journey through Nagpur's cultural heritage and modern attractions...",
    content: "Known as the Orange City for its famous citrus exports, Nagpur offers visitors much more than just its sweet fruit. At the geographic center of India – marked by the historic Zero Mile Stone – this city in eastern Maharashtra blends rich cultural heritage with modern urban development.\n\nNagpur's story begins thousands of years ago, with archaeological evidence suggesting human settlement since prehistoric times. The city rose to prominence under the Gond dynasty in the 18th century before passing through Maratha and British control. This layered history has left its mark on Nagpur's architecture and culture.\n\nThe Deekshabhoomi, a magnificent stupa where Dr. B.R. Ambedkar converted to Buddhism along with thousands of followers in 1956, stands as one of the city's most significant monuments. Its peaceful grounds and impressive dome draw visitors from across the country, especially during Buddhist festivals.\n\nFor nature lovers, Nagpur offers surprising retreats within and around the city. The Seminary Hills provide a green respite with walking trails and panoramic views, while nearby Ambazari Lake is perfect for evening strolls and boating. More adventurous travelers can explore Pench National Park just an hour's drive away – the real-life setting that inspired Rudyard Kipling's 'The Jungle Book.'\n\nNagpur's culinary scene deserves special mention, with distinctive local specialties like saoji food – known for its fiery spices and robust flavors. The city's orange barfi and santra barfi showcase the region's famous fruit in sweet, delectable forms.\n\nAs you explore Nagpur's wide, well-planned streets (a rarity in many Indian cities), you'll discover a place that beautifully balances tradition and progress – where ancient temples and colonial buildings stand alongside modern infrastructure and technology hubs, creating a unique city that truly represents the heart of India.",
    image: "https://images.unsplash.com/photo-1609949424499-31871d858d69?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "travel",
    tags: ["nagpur", "culture", "nature", "history"]
  },
  {
    id: "4",
    title: "Weekend Trek to Rajmachi Fort",
    author: "Neha Desai",
    date: "April 12, 2025",
    excerpt: "An adventurous trek to the historic Rajmachi Fort in the Western Ghats...",
    content: "Perched dramatically in the rugged Western Ghats, Rajmachi Fort offers one of Maharashtra's most rewarding trekking experiences. This twin-fortified structure, consisting of Shrivardhan and Manaranjan forts, dates back to the 17th century and provides breathtaking panoramic views that make the challenging climb absolutely worthwhile.\n\nThe adventure begins at either Lonavala or the tiny village of Udhewadi, with both routes offering unique experiences. The Lonavala route is longer but more gradual, winding through dense forests filled with diverse flora and fauna. During monsoon season, this path comes alive with countless small waterfalls and vibrant greenery that transforms the landscape into a verdant paradise.\n\nThe Kondivade village route is shorter but steeper, offering a more challenging trek for experienced hikers. Whichever path you choose, you'll be rewarded with stunning vistas of the surrounding valleys and the majestic Sahyadri mountains stretching into the distance.\n\nUpon reaching the fort complex, take time to explore the ancient stone structures, water cisterns, and temples that have witnessed centuries of history. The strategic importance of Rajmachi becomes immediately apparent as you stand atop its walls, with commanding views in all directions – the same views that once helped defenders spot approaching armies from miles away.\n\nFor the full Rajmachi experience, consider camping overnight on the plateau near the fort. As darkness falls, the sky transforms into a spectacular display of stars, unpolluted by city lights. The morning brings another gift – a sunrise that gradually illuminates the misty valleys below, creating a magical landscape that seems to belong in a painting rather than reality.\n\nWhile the trek can be completed in a day, a weekend trip allows you to fully appreciate this historical and natural wonder. Just remember to pack essentials like sufficient water, weather-appropriate clothing, and basic first aid supplies. During monsoon season (June-September), the trek becomes more challenging but also more beautiful, with lush greenery and flowing streams enhancing the already spectacular scenery.",
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "adventure",
    tags: ["trekking", "maharashtra", "western-ghats", "camping"]
  },
  {
    id: "5",
    title: "Spiritual Journey Through Nashik",
    author: "Deepika Kulkarni",
    date: "April 11, 2025",
    excerpt: "Exploring the sacred sites and temples of Nashik, one of India's holiest cities...",
    content: "Nestled in the northwest of Maharashtra, Nashik is a city where spirituality permeates the very air. As one of the four sacred sites where the Kumbh Mela is held every 12 years, Nashik's spiritual significance dates back thousands of years, mentioned in ancient texts as a place of great religious importance.\n\nThe heart of spiritual Nashik lies along the banks of the holy Godavari River, affectionately known as the 'Ganga of the South.' The Ramkund, a sacred bathing tank in the center of the city, draws pilgrims who believe its waters wash away sins. According to Hindu mythology, Lord Rama, Sita, and Lakshmana spent significant time in Nashik during their 14-year exile, leaving their divine footprints on numerous sites throughout the city.\n\nThe Kalaram Temple, dedicated to Lord Rama, stands as one of Nashik's most significant religious monuments. Its name derives from the black (kala) stone idol of Rama enshrined within. The temple's architecture impresses with intricate carvings and massive pillars, while its historical significance extends to social movements – it was here that Dr. B.R. Ambedkar led the famous temple entry movement in 1930.\n\nJust outside Nashik, the Trimbakeshwar Temple houses one of India's twelve Jyotirlingas (sacred abodes of Lord Shiva). The temple's ancient architecture and spiritual vibrations create a profound experience for devotees and visitors alike. The source of the Godavari River originates near this temple, adding to its sacred status.\n\nBeyond Hindu sites, Nashik offers spiritual diversity with the Saptashrungi Devi temple dedicated to the goddess Durga, set dramatically atop a hill, and ancient Buddhist caves at Pandavleni dating back to the 1st century BCE.\n\nA spiritual journey through Nashik isn't complete without experiencing an evening aarti (prayer ceremony) along the Godavari ghats, where flickering lamps illuminate the dark waters, chants fill the air, and the eternal rhythm of faith continues as it has for centuries in this remarkable city.",
    image: "https://images.unsplash.com/photo-1626015253889-bf83bebfff18?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "spiritual",
    tags: ["nashik", "temples", "godavari", "pilgrimage"]
  },
  {
    id: "6",
    title: "Kolhapur's Culinary Treasures",
    author: "Sanjay Patil",
    date: "April 10, 2025",
    excerpt: "Dive into the spicy and flavorful world of Kolhapur's unique cuisine...",
    content: "Kolhapur's cuisine stands as one of Maharashtra's most distinctive culinary traditions, known for its fiery spices, complex flavors, and royal heritage. Rooted in the kitchens of the Maratha warriors and refined in the royal courts of the Chhatrapati dynasty, Kolhapuri food is unapologetically bold and deeply satisfying.\n\nThe crown jewel of Kolhapur's culinary offerings is the famous Tambda Rassa (red curry) and Pandhra Rassa (white curry) – two complementary meat curries traditionally served together. The red curry derives its vibrant color and intense heat from a special blend of Kolhapuri chilies and spices, while the white curry offers a milder, more aromatic counterpoint with its base of coconut, garlic, and poppy seeds.\n\nKolhapuri Misal presents another beloved local specialty – a spicy sprout curry topped with farsan (crunchy sev), onions, and a squeeze of lime, often served with bread or pav. Local eateries compete for the title of the spiciest misal, with heat levels that challenge even the most seasoned spice enthusiasts.\n\nThe city's love for meat dishes shows in specialties like Sukka Mutton (dry spiced meat), Saoji Chicken, and various preparations of the local Gavran (country) chicken, prized for its flavor. These dishes exemplify Kolhapur's expertise in balancing numerous spices to create depth without overwhelming the main ingredient.\n\nVegetarians find equally exciting options in Kolhapur, from Pithla Bhakri (spiced gram flour curry with millet flatbread) to Dhapate (multi-grain flatbread) served with thecha (spicy garlic chutney). The local sweet specialties include Rajgira Ladoo and the unique taste of Anarsa, a rice flour and jaggery delicacy.\n\nWhat makes Kolhapur's food culture special extends beyond the recipes to the traditional cookware – particularly the Kolhapuri style of hammered copper and brass vessels that locals believe enhance the flavors of their distinctive cuisine.\n\nVisiting Kolhapur without diving into its culinary heritage means missing half the city's cultural identity – each fiery bite connects you to centuries of history, from warrior camps to royal kitchens to the modern tables where these traditions continue to evolve while honoring their remarkable past.",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "food",
    tags: ["kolhapur", "spicy", "authentic", "maharashtrian"]
  },
];

const BlogPost = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [likes, setLikes] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // In a real app, fetch from API
    const foundBlog = blogPosts.find(b => b.id === blogId);
    if (foundBlog) {
      setBlog(foundBlog);
    } else {
      // If blog not found, redirect to blogs page
      navigate('/blogs');
    }
  }, [blogId, navigate]);

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-flash">
        <Navigation />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-flash">
      <Navigation />
      <main className="flex-grow">
        {/* Hero image */}
        <div className="w-full h-[40vh] md:h-[50vh] relative">
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="container mx-auto px-4 pb-8">
              <Button 
                variant="ghost" 
                className="mb-4 text-white hover:bg-black/20"
                onClick={() => navigate('/blogs')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blogs
              </Button>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{blog.title}</h1>
              <div className="flex items-center text-white/90">
                <span className="text-sm">{blog.date}</span>
                <span className="mx-2">•</span>
                <span className="text-sm">By {blog.author}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Blog content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            {/* Author and social actions */}
            <div className="flex justify-between items-center mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src={`https://avatar.vercel.sh/${blog.author}`} />
                  <AvatarFallback>{blog.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{blog.author}</h3>
                  <p className="text-sm text-heritage-gray">Travel Enthusiast</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setLikes(prev => prev + 1)}
                  className={likes > 0 ? "text-heritage-terracotta border-heritage-terracotta" : ""}
                >
                  <Heart className={`mr-1 h-4 w-4 ${likes > 0 ? "fill-heritage-terracotta" : ""}`} />
                  {likes}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={isBookmarked ? "text-heritage-blue border-heritage-blue" : ""}
                >
                  <Bookmark className={`mr-1 h-4 w-4 ${isBookmarked ? "fill-heritage-blue" : ""}`} />
                  {isBookmarked ? "Saved" : "Save"}
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-1 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {blog.tags.map((tag, index) => (
                <span key={index} className="text-xs bg-heritage-cream px-2 py-1 rounded-full text-heritage-terracotta">
                  #{tag}
                </span>
              ))}
            </div>
            
            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {blog.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-6 text-heritage-dark">{paragraph}</p>
              ))}
            </div>
            
            {/* Comment section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-bold mb-6">Comments</h3>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-heritage-gray text-center py-8">
                  Login or create an account to join the conversation
                </p>
              </div>
            </div>
            
            {/* Related posts */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6">Related Stories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogPosts
                  .filter(post => post.id !== blog.id && post.category === blog.category)
                  .slice(0, 2)
                  .map(post => (
                    <div 
                      key={post.id} 
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                      onClick={() => navigate(`/blogs/${post.id}`)}
                    >
                      <div className="flex h-32">
                        <img src={post.image} alt={post.title} className="w-1/3 object-cover" />
                        <div className="w-2/3 p-4">
                          <h4 className="font-bold text-heritage-dark mb-2 line-clamp-2">{post.title}</h4>
                          <p className="text-heritage-gray text-sm line-clamp-2">{post.excerpt}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
