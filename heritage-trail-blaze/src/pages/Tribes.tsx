
import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Users, MessageCircle, Search, User, Plus, Check, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

interface TribeMember {
  id: string;
  name: string;
  avatar: string;
  joinedDate: string;
  isActive: boolean;
}

interface TribeChatMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  message: string;
  timestamp: string;
}

interface Tribe {
  id: string;
  name: string;
  members: number;
  description: string;
  category: string;
  coverImage: string;
  isFeatured: boolean;
  membersList: TribeMember[];
  recentMessages: TribeChatMessage[];
}

const TribeCard = ({ tribe, onJoin, joined }: { 
  tribe: Tribe; 
  onJoin: (tribeId: string) => void;
  joined: boolean;
}) => {
  const [showChat, setShowChat] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();
  
  const handleJoin = () => {
    onJoin(tribe.id);
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      toast({
        description: "Message sent to tribe!",
      });
      setNewMessage("");
    }
  };
  
  const randomOnlineCount = Math.floor(Math.random() * (tribe.members / 4)) + 5;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-40">
        <img 
          src={tribe.coverImage || "https://images.unsplash.com/photo-1588421357574-87938a86fa28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
          alt={tribe.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex items-end">
          <div className="p-4 text-white w-full">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">{tribe.name}</h3>
                <span className="text-white/80 text-sm">{tribe.category}</span>
              </div>
              {tribe.isFeatured && (
                <Badge className="bg-yellow-500">
                  <Star className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-blue-mystic/80 mb-4 line-clamp-2">{tribe.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex -space-x-2">
              {tribe.membersList.slice(0, 3).map((member, i) => (
                <Avatar key={i} className="border-2 border-white w-8 h-8">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
              ))}
              {tribe.members > 3 && (
                <div className="bg-blue-venice/10 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white text-xs font-medium text-blue-venice">
                  +{tribe.members - 3}
                </div>
              )}
            </div>
            <div className="mt-1 text-xs text-blue-mystic/60">
              {randomOnlineCount} members online
            </div>
          </div>
          
          <div className="flex gap-2">
            {joined ? (
              <Button 
                variant="outline" 
                className="flex-1" 
                onClick={() => setShowChat(!showChat)}
                size="sm"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Chat
              </Button>
            ) : null}
            
            <Button 
              className={joined 
                ? "bg-green-turf hover:bg-green-turf/90" 
                : "bg-blue-venice hover:bg-blue-venice/90"
              }
              onClick={handleJoin}
              size="sm"
            >
              {joined ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Joined
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Join Tribe
                </>
              )}
            </Button>
          </div>
        </div>
        
        {showChat && (
          <div className="border rounded-lg mt-2">
            <div className="p-3 border-b">
              <h4 className="font-medium">Tribe Chat</h4>
            </div>
            <div className="h-48 overflow-y-auto p-3 space-y-3">
              {tribe.recentMessages.map((msg) => (
                <div key={msg.id} className="flex gap-2">
                  <Avatar className="w-7 h-7">
                    <AvatarImage src={msg.userAvatar} />
                    <AvatarFallback>{msg.userName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium">{msg.userName}</span>
                      <span className="text-xs text-blue-mystic/60">{msg.timestamp}</span>
                    </div>
                    <p className="text-sm">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="flex gap-1 p-2 border-t">
              <Input 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="text-sm"
              />
              <Button type="submit" size="sm">Send</Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

const Tribes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [joinedTribes, setJoinedTribes] = useState<string[]>([]);
  const { toast } = useToast();
  
  const avatars = [
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
  ];
  
  const createRandomMember = (id: number): TribeMember => ({
    id: `member-${id}`,
    name: ["Rahul", "Priya", "Amit", "Sneha", "Deepak", "Meera", "Vikram", "Ananya"][Math.floor(Math.random() * 8)] + " " + 
          ["Sharma", "Patel", "Singh", "Desai", "Kumar", "Shah", "Joshi", "Mehta"][Math.floor(Math.random() * 8)],
    avatar: avatars[Math.floor(Math.random() * avatars.length)],
    joinedDate: `${Math.floor(Math.random() * 12) + 1} months ago`,
    isActive: Math.random() > 0.3
  });
  
  const createTribeWithMembers = (baseData: Omit<Tribe, 'membersList' | 'recentMessages'>): Tribe => {
    const memberCount = baseData.members;
    const membersList: TribeMember[] = Array.from({ length: Math.min(20, memberCount) }, (_, i) => 
      createRandomMember(i)
    );
    
    const recentMessages: TribeChatMessage[] = [
      {
        id: "msg1",
        userId: "user1",
        userName: membersList[0].name,
        userAvatar: membersList[0].avatar,
        message: "Hey everyone! Excited to be part of this tribe.",
        timestamp: "Just now"
      },
      {
        id: "msg2",
        userId: "user2",
        userName: membersList[1].name,
        userAvatar: membersList[1].avatar,
        message: "I'm planning a trip to Pune next weekend. Anyone interested in joining?",
        timestamp: "5 min ago"
      },
      {
        id: "msg3",
        userId: "user3",
        userName: membersList[2].name,
        userAvatar: membersList[2].avatar,
        message: "Check out these photos from my visit to Ellora Caves last month!",
        timestamp: "15 min ago"
      }
    ];
    
    return {
      ...baseData,
      membersList,
      recentMessages
    };
  };
  
  const tribes = [
    createTribeWithMembers({
      id: "solo-backpackers",
      name: "Solo Backpackers Maharashtra",
      members: 1250,
      category: "Adventure Travel",
      description: "Connect with solo travelers exploring Maharashtra's hidden gems and share your experiences.",
      coverImage: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      isFeatured: true,
    }),
    createTribeWithMembers({
      id: "luxury-getaways",
      name: "Luxury Maharashtrian Getaways",
      members: 850,
      category: "Luxury Travel",
      description: "For travelers seeking premium experiences in Maharashtra's finest destinations.",
      coverImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      isFeatured: false,
    }),
    createTribeWithMembers({
      id: "heritage-explorers",
      name: "Heritage Explorers",
      members: 2100,
      category: "Cultural Travel",
      description: "Discover and document Maharashtra's rich cultural heritage and historical sites.",
      coverImage: "https://images.unsplash.com/photo-1623075559810-2c3619cb18c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      isFeatured: true,
    }),
    createTribeWithMembers({
      id: "eco-adventurers",
      name: "Eco Adventurers",
      members: 1500,
      category: "Sustainable Travel",
      description: "Promoting sustainable tourism and eco-friendly adventures across Maharashtra.",
      coverImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      isFeatured: false,
    }),
    createTribeWithMembers({
      id: "food-trail",
      name: "Food Trail Maharashtra",
      members: 3200,
      category: "Food & Culture",
      description: "Exploring Maharashtra's diverse culinary landscape and food traditions.",
      coverImage: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      isFeatured: false,
    }),
    createTribeWithMembers({
      id: "weekend-warriors",
      name: "Weekend Warriors",
      members: 2800,
      category: "Short Trips",
      description: "Perfect for travelers planning quick weekend getaways in Maharashtra.",
      coverImage: "https://images.unsplash.com/photo-1617653695386-844eb9045cd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      isFeatured: false,
    })
  ];

  const handleJoinTribe = (tribeId: string) => {
    if (joinedTribes.includes(tribeId)) {
      // Leave tribe
      setJoinedTribes(joinedTribes.filter(id => id !== tribeId));
      toast({
        description: "You've left the tribe",
      });
    } else {
      // Join tribe
      setJoinedTribes([...joinedTribes, tribeId]);
      toast({
        description: "You've joined the tribe! Connect with fellow travelers.",
      });
    }
  };
  
  const filteredTribes = searchQuery
    ? tribes.filter(tribe => 
        tribe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tribe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tribe.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tribes;

  return (
    <div className="min-h-screen flex flex-col bg-gray-flash">
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-blue-mystic mb-4">Travel Tribes</h1>
            <p className="text-blue-mystic/80 max-w-2xl">
              Join like-minded travelers, share experiences, and plan adventures together.
              Find your perfect travel community in Maharashtra!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/profile">
              <Button variant="outline" className="border-blue-venice text-blue-venice w-full sm:w-auto">
                <User className="mr-2 h-4 w-4" />
                My Tribes
              </Button>
            </Link>
            <Button className="bg-blue-venice hover:bg-blue-venice/90 w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Create Tribe
            </Button>
          </div>
        </div>
        
        {/* Search and filter */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-mystic/50" />
              <Input 
                placeholder="Search tribes by name, category or description..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-blue-mystic/70 whitespace-nowrap">Showing {filteredTribes.length} tribes</span>
            </div>
          </div>
        </div>
        
        {/* Featured tribe */}
        {filteredTribes.find(tribe => tribe.isFeatured) && !searchQuery && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-blue-mystic mb-6 flex items-center">
              <Star className="mr-2 h-5 w-5 text-yellow-500" />
              Featured Tribes
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTribes
                .filter(tribe => tribe.isFeatured)
                .map(tribe => (
                  <TribeCard 
                    key={tribe.id}
                    tribe={tribe}
                    onJoin={handleJoinTribe}
                    joined={joinedTribes.includes(tribe.id)}
                  />
                ))
              }
            </div>
          </div>
        )}
        
        {/* All tribes */}
        <div>
          <h2 className="text-2xl font-bold text-blue-mystic mb-6 flex items-center">
            <Users className="mr-2 h-5 w-5" />
            {searchQuery ? "Search Results" : "All Tribes"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTribes
              .filter(tribe => searchQuery ? true : !tribe.isFeatured)
              .map(tribe => (
                <TribeCard 
                  key={tribe.id}
                  tribe={tribe}
                  onJoin={handleJoinTribe}
                  joined={joinedTribes.includes(tribe.id)}
                />
              ))
            }
          </div>
        </div>
        
        {filteredTribes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-blue-mystic/70">No tribes found matching your search.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setSearchQuery("")}
            >
              Clear Search
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Tribes;
