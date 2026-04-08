
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BookOpen, Heart, MessageSquare, Share2, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Blog post interface for type safety
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

const BlogCard = ({ post, onClick }: { post: BlogPost; onClick: () => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes(prev => prev + 1);
  };

  const toggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };
  
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Share functionality would go here
    console.log("Sharing post:", post.title);
  };

  const handleCommentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Comment functionality would go here
    console.log("Showing comments for:", post.title);
  };

  return (
    <Card 
      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <img src={post.image} alt={post.title} className="w-full h-64 object-cover hover:opacity-90 transition-opacity" />
      <CardContent className="p-6">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 rounded-full bg-heritage-gray/20 mr-3"></div>
          <div>
            <h4 className="font-medium text-sm">{post.author}</h4>
            <p className="text-xs text-heritage-gray">{post.date}</p>
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-heritage-dark mb-3 hover:text-heritage-terracotta transition-colors">{post.title}</h3>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((tag, index) => (
            <span key={index} className="text-xs bg-heritage-cream px-2 py-1 rounded-full text-heritage-terracotta">
              #{tag}
            </span>
          ))}
        </div>
        
        <p className={`text-heritage-gray ${isExpanded ? '' : 'line-clamp-3'} mb-4`}>
          {post.excerpt}
        </p>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleLike}
              className="text-heritage-gray hover:text-heritage-terracotta"
            >
              <Heart className={`mr-1 ${likes > 0 ? 'fill-heritage-terracotta text-heritage-terracotta' : ''}`} />
              {likes}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-heritage-gray hover:text-heritage-blue"
              onClick={handleCommentClick}
            >
              <MessageSquare className="mr-1" />
              Comments
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-heritage-gray hover:text-heritage-blue"
              onClick={handleShare}
            >
              <Share2 className="mr-1" />
              Share
            </Button>
          </div>
          <Button
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="text-heritage-terracotta hover:text-heritage-terracotta/90"
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Blogs = () => {
  const navigate = useNavigate();
  const [layout, setLayout] = useState<'grid' | 'masonry'>('masonry');
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  const blogs: BlogPost[] = [
    {
      id: "1",
      title: "Hidden Gems of Pune's Old City",
      author: "Priya Sharma",
      date: "April 15, 2025",
      excerpt: "Exploring the narrow lanes and historical wonders of Pune's heart. This hidden tour takes you through ancient temples, vibrant markets, and authentic food stalls that most tourists never discover.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: "https://images.unsplash.com/photo-1623075559810-2c3619cb18c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "heritage",
      tags: ["pune", "history", "food", "architecture"]
    },
    {
      id: "2",
      title: "A Food Trail Through Mumbai",
      author: "Raj Mehta",
      date: "April 14, 2025",
      excerpt: "Discovering the best street food spots in Mumbai's bustling streets. From vada pav to pav bhaji, this guide helps you navigate the culinary landscape of Maximum City with insider tips.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "food",
      tags: ["mumbai", "street-food", "culinary", "local"]
    },
    {
      id: "3",
      title: "Nagpur: Orange City Chronicles",
      author: "Amit Patel",
      date: "April 13, 2025",
      excerpt: "A journey through Nagpur's cultural heritage and modern attractions. Discover why this city is more than just oranges, with its rich history, beautiful lakes, and vibrant local culture.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: "https://images.unsplash.com/photo-1609949424499-31871d858d69?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "travel",
      tags: ["nagpur", "culture", "nature", "history"]
    },
    {
      id: "4",
      title: "Weekend Trek to Rajmachi Fort",
      author: "Neha Desai",
      date: "April 12, 2025",
      excerpt: "An adventurous trek to the historic Rajmachi Fort in the Western Ghats. This two-day itinerary includes camping under the stars and witnessing breathtaking views of the surrounding valleys.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "adventure",
      tags: ["trekking", "maharashtra", "western-ghats", "camping"]
    },
    {
      id: "5",
      title: "Spiritual Journey Through Nashik",
      author: "Deepika Kulkarni",
      date: "April 11, 2025",
      excerpt: "Exploring the sacred sites and temples of Nashik, one of India's holiest cities. From the ghats of the Godavari to ancient cave temples, this spiritual journey will leave you enlightened.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: "https://images.unsplash.com/photo-1626015253889-bf83bebfff18?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "spiritual",
      tags: ["nashik", "temples", "godavari", "pilgrimage"]
    },
    {
      id: "6",
      title: "Kolhapur's Culinary Treasures",
      author: "Sanjay Patil",
      date: "April 10, 2025",
      excerpt: "Dive into the spicy and flavorful world of Kolhapur's unique cuisine. From the famous Kolhapuri Misal to the iconic Tambda-Pandhra Rassa, this food guide will set your taste buds on fire.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "food",
      tags: ["kolhapur", "spicy", "authentic", "maharashtrian"]
    },
  ];

  const handleBlogClick = (blogId: string) => {
    console.log(`Navigating to blog ${blogId}`);
    navigate(`/blogs/${blogId}`);
    // Note: You'll need to add a route for individual blog posts in App.tsx
  };

  const filteredBlogs = activeCategory === "all" 
    ? blogs 
    : blogs.filter(blog => blog.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-gray-flash">
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-heritage-dark mb-4">Travel Stories</h1>
            <p className="text-heritage-gray">
              Discover and share amazing travel experiences across Maharashtra
            </p>
          </div>
          <Button className="bg-heritage-terracotta hover:bg-heritage-terracotta/90 text-white">
            <BookOpen className="mr-2" />
            Write a Story
          </Button>
        </div>
        
        <div className="mb-8">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex items-center justify-between mb-6">
              <TabsList>
                <TabsTrigger value="all" onClick={() => setActiveCategory("all")}>All Posts</TabsTrigger>
                <TabsTrigger value="heritage" onClick={() => setActiveCategory("heritage")}>Heritage</TabsTrigger>
                <TabsTrigger value="food" onClick={() => setActiveCategory("food")}>Food</TabsTrigger>
                <TabsTrigger value="adventure" onClick={() => setActiveCategory("adventure")}>Adventure</TabsTrigger>
                <TabsTrigger value="spiritual" onClick={() => setActiveCategory("spiritual")}>Spiritual</TabsTrigger>
                <TabsTrigger value="travel" onClick={() => setActiveCategory("travel")}>Travel</TabsTrigger>
              </TabsList>
              
              <div className="flex gap-2">
                <Button 
                  variant={layout === 'grid' ? 'default' : 'outline'} 
                  onClick={() => setLayout('grid')}
                  size="sm"
                >
                  Grid
                </Button>
                <Button 
                  variant={layout === 'masonry' ? 'default' : 'outline'} 
                  onClick={() => setLayout('masonry')}
                  size="sm"
                >
                  Masonry
                </Button>
              </div>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <div className={`${
                layout === 'masonry' 
                  ? 'columns-1 md:columns-2 lg:columns-3 gap-6' 
                  : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              }`}>
                {filteredBlogs.map((blog) => (
                  <div key={blog.id} className={layout === 'masonry' ? 'mb-6 break-inside-avoid' : ''}>
                    <BlogCard post={blog} onClick={() => handleBlogClick(blog.id)} />
                  </div>
                ))}
              </div>
            </TabsContent>
            
            {["heritage", "food", "adventure", "spiritual", "travel"].map(category => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className={`${
                  layout === 'masonry' 
                    ? 'columns-1 md:columns-2 lg:columns-3 gap-6' 
                    : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                }`}>
                  {filteredBlogs.map((blog) => (
                    <div key={blog.id} className={layout === 'masonry' ? 'mb-6 break-inside-avoid' : ''}>
                      <BlogCard post={blog} onClick={() => handleBlogClick(blog.id)} />
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blogs;
