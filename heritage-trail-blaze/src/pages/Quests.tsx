
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Award, MapPin, Camera, Utensils } from "lucide-react";
import { Progress } from "@/components/ui/progress";




const QuestCard = ({ title, description, reward, progress, image, type, setActiveQuest, setShowModal  }: { 
  title: string; 
  description: string; 
  reward: string;
  progress: number;
  image: string;
  type: string;
  setActiveQuest: Function, setShowModal: Function 

}) => {
  const [hover, setHover] = useState(false);
  
  const getIconByType = (type: string) => {
    switch (type) {
      case "food": return <Utensils className="h-5 w-5 text-heritage-terracotta" />;
      case "photo": return <Camera className="h-5 w-5 text-heritage-terracotta" />;
      default: return <MapPin className="h-5 w-5 text-heritage-terracotta" />;
    }
  };
  
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative h-48">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
          style={{ transform: hover ? 'scale(1.05)' : 'scale(1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 flex items-end">
          <div className="p-4 text-white">
            <div className="flex items-center mb-2">
              {getIconByType(type)}
              <span className="ml-2 text-xs uppercase tracking-wider">{type} quest</span>
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
          </div>
        </div>
        
        <div className="absolute top-3 right-3">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-sm">
            <Award className="h-5 w-5 text-heritage-terracotta" />
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <p className="text-heritage-gray mb-4 min-h-[60px]">{description}</p>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm font-medium">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2 mb-4" />
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-heritage-terracotta">Reward</p>
            <p className="text-sm">{reward}</p>
          </div>
          
          {/* <Button>
            <Award className="mr-2 h-4 w-4" />
            {progress > 0 ? "Continue Quest" : "Start Quest"}
          </Button> */}
          <Button onClick={() => {
  setActiveQuest({ title, type, reward });
  setShowModal(true);
}}>
  <Award className="mr-2 h-4 w-4" />
  {progress > 0 ? "Continue Quest" : "Start Quest"}
</Button>

        </div>
      </div>
    </div>
  );
};

//const QuestCollection = ({ title, quests }: { title: string; quests: any[] }) => (
  const QuestCollection = ({
    title,
    quests,
    setActiveQuest,
    setShowModal,
  }: {
    title: string;
    quests: any[];
    setActiveQuest: Function;
    setShowModal: Function;
  }) => (  
  <div className="mb-12">
    <h2 className="text-2xl font-bold text-blue-mystic mb-6">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quests.map((quest, index) => (
        <QuestCard key={index} {...quest} 
        setActiveQuest={setActiveQuest}
  setShowModal={setShowModal}
  />
      ))}
    </div>
  </div>
);

const Quests = () => {
  const [activeQuest, setActiveQuest] = useState(null);
const [uploads, setUploads] = useState<string[]>([]);
const [showModal, setShowModal] = useState(false);
  const foodQuests = [
    {
      title: "Foodie Adventure in Mumbai",
      description: "Try 5 different street foods in Mumbai's most iconic locations and document your culinary journey.",
      reward: "Mumbai Street Food Connoisseur Stamp",
      progress: 0,
      image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "food"
    },
    {
      title: "Pune's Sweet Trail",
      description: "Visit 4 historic sweet shops in Pune and taste their signature delicacies.",
      reward: "Pune Sweet Tooth Badge",
      progress: 30,
      image: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "food"
    }
  ];
  
  const heritageQuests = [
    {
      title: "Heritage Explorer",
      description: "Visit 3 historical sites in Pune and document your journey through photographs.",
      reward: "Pune Heritage Explorer Stamp + Badge",
      progress: 30,
      image: "https://images.unsplash.com/photo-1623075559810-2c3619cb18c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "heritage"
    },
    {
      title: "Cultural Immersion",
      description: "Attend 2 local cultural events and share your experience with the community.",
      reward: "Cultural Ambassador Badge",
      progress: 0,
      image: "https://images.unsplash.com/photo-1604917877934-63c7772cc0cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "heritage"
    }
  ];
  
  const photoQuests = [
    {
      title: "Sunset Chaser",
      description: "Capture the best sunset views from Nagpur's viewpoints and share your top 3 photos.",
      reward: "Golden Hour Photographer Badge",
      progress: 60,
      image: "https://images.unsplash.com/photo-1564139615082-01535600057f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "photo"
    },
    {
      title: "Architectural Marvels",
      description: "Photograph 5 unique architectural features across Maharashtra's temples and palaces.",
      reward: "Architecture Photographer Stamp",
      progress: 20,
      image: "https://images.unsplash.com/photo-1590395243068-eb288a6f6250?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      type: "photo"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-flash">
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-4xl font-bold text-blue-mystic mb-4">Travel Quests</h1>
            <p className="text-blue-mystic/80 max-w-2xl">
              Complete exciting challenges across Maharashtra to earn stamps and badges for your travel passport.
              Share your adventures and compete with fellow travelers!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="bg-blue-venice hover:bg-blue-venice/90">
              <Award className="mr-2" />
              My Passport
            </Button>
            <Button variant="outline" className="border-blue-venice text-blue-venice">
              View All Badges
            </Button>
          </div>
        </div>
        
        {/* Featured Quest Banner */}
        <div className="relative rounded-xl overflow-hidden mb-12 shadow-xl">
          <img 
            src="https://images.unsplash.com/photo-1567157577867-05ccb1388e66?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
            alt="Maharashtra Grand Tour"
            className="w-full h-[300px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 flex items-end">
            <div className="p-8 text-white w-full">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <span className="bg-heritage-terracotta px-3 py-1 rounded-full text-sm inline-block mb-4">Featured Quest</span>
                  <h2 className="text-3xl font-bold mb-2">Maharashtra Grand Tour</h2>
                  <p className="text-white/80 max-w-xl mb-4">
                    Visit all six major cities of Maharashtra in one year, collecting stamps and badges from each location.
                    Complete the ultimate travel challenge!
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg inline-block">
                    <div className="text-5xl font-bold mb-1">6</div>
                    <div className="text-sm uppercase tracking-wider opacity-80">Stamps to Collect</div>
                  </div>
                  
                  <Button className="bg-heritage-terracotta hover:bg-heritage-terracotta/90 mt-4 w-full">
                    <Award className="mr-2" />
                    Begin Your Journey
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* <QuestCollection title="Food & Culinary Quests" quests={foodQuests} />
        <QuestCollection title="Heritage & Cultural Quests" quests={heritageQuests} />
        <QuestCollection title="Photography Challenges" quests={photoQuests} /> */}
        
        <QuestCollection
  title="Food & Culinary Quests"
  quests={foodQuests}
  setActiveQuest={setActiveQuest}
  setShowModal={setShowModal}
/>
<QuestCollection
  title="Heritage & Cultural Quests"
  quests={heritageQuests}
  setActiveQuest={setActiveQuest}
  setShowModal={setShowModal}
/>
<QuestCollection
  title="Photography Challenges"
  quests={photoQuests}
  setActiveQuest={setActiveQuest}
  setShowModal={setShowModal}
/>

        <div className="text-center mt-8">
          <Button className="bg-blue-venice hover:bg-blue-venice/90">
            Load More Quests
          </Button>
        </div>
      </main>

      {showModal && activeQuest && (
  <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
    <div className="bg-white rounded-xl shadow-xl p-6 max-w-lg w-full">
      <h2 className="text-xl font-bold mb-2">{activeQuest.title}</h2>
      <p className="text-sm text-gray-500 mb-4">Upload 5 photos to complete this quest and earn your reward!</p>

      <div className="grid grid-cols-5 gap-2 mb-4">
        {[...Array(5)].map((_, i) => (
          <label key={i} className="border border-dashed border-gray-400 rounded p-2 h-20 flex items-center justify-center cursor-pointer">
            <input type="file" accept="image/*" hidden onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const url = URL.createObjectURL(file);
                setUploads(prev => {
                  const updated = [...prev];
                  updated[i] = url;
                  return updated;
                });
              }
            }} />
            {uploads[i] ? (
              <img src={uploads[i]} alt={`upload-${i}`} className="h-full w-full object-cover rounded" />
            ) : (
              <Camera className="h-6 w-6 text-gray-400" />
            )}
          </label>
        ))}
      </div>

      <div className="text-right">
        {uploads.filter(Boolean).length === 5 ? (
          <Button className="bg-green-600 hover:bg-green-700" onClick={() => {
            setShowModal(false);
            alert(`🎉 Quest Completed! You've earned: ${activeQuest.reward}`);
            // optional: update progress here
          }}>
            Claim {activeQuest.reward}
          </Button>
        ) : (
          <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
        )}
      </div>
    </div>
  </div>
)}


      <Footer />
    </div>
  );
};

export default Quests;
