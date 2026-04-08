
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, Heart, MessageSquare, Share2, Upload, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

interface Photo {
  id: string;
  image: string;
  caption: string;
  location: string;
  date: string;
  likes: number;
  comments: number;
  user: {
    name: string;
    avatar: string;
  };
  liked?: boolean;
}

interface CityGalleryProps {
  cityId: string;
  cityName: string;
}

const CityGallery = ({ cityId, cityName }: CityGalleryProps) => {
  const { toast } = useToast();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadCaption, setUploadCaption] = useState("");
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  
  // Generate some random photos for the city
  const generateCityPhotos = (): Photo[] => {
    const photos: Photo[] = [];
    
    const getImageUrl = (city: string, index: number) => {
      if (city === "mumbai") {
        return [
          "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1590080552494-dcda538fa459?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1562979314-bee7453e911c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1566553253563-2696f41f923a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1595658658481-d53d3f999875?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1609934536541-357244e7400e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        ][index % 8];
      } else if (city === "pune") {
        return [
          "https://images.unsplash.com/photo-1623075559810-2c3619cb18c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1591804201521-6259af4c72a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1599661046827-e561d3d571c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1558383817-8ebcfb56f8c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1591101046554-efa60e66f362?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1581257163388-7e990af14ab9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1615891263408-9a6e92cda486?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1622730000629-a3fbc0a3d0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        ][index % 8];
      } else if (city === "nagpur") {
        return [
          "https://images.unsplash.com/photo-1609949424499-31871d858d69?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1621317962819-067a7dea4d6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1602391833977-358a52198938?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1626331640794-57aa1bc30891?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1572452571879-3d68477bb42a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1596813362035-3edcff0c2487?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        ][index % 8];
      } else {
        // Default photos for any other city
        return [
          "https://images.unsplash.com/photo-1602391833977-358a52198938?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1596813362035-3edcff0c2487?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        ][index % 4];
      }
    };
    
    const userAvatars = [
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    ];
    
    const userNames = [
      "Rahul Sharma", "Priya Patel", "Amit Singh", "Sneha Desai",
      "Vikram Malhotra", "Ananya Das", "Ravi Kumar", "Meera Shah"
    ];
    
    const captions = [
      `Beautiful view at ${cityName}`,
      `Exploring the streets of ${cityName}`,
      `Historic architecture in ${cityName}`,
      `Sunset view from ${cityName} hills`,
      `Cultural festival in ${cityName}`,
      `Local cuisine of ${cityName}`,
      `Heritage site in ${cityName}`,
      `Morning walk through ${cityName}`
    ];
    
    for (let i = 0; i < 12; i++) {
      photos.push({
        id: `photo-${i}`,
        image: getImageUrl(cityId, i),
        caption: captions[i % captions.length],
        location: cityName,
        date: `${Math.floor(Math.random() * 30) + 1} days ago`,
        likes: Math.floor(Math.random() * 200) + 10,
        comments: Math.floor(Math.random() * 30) + 1,
        user: {
          name: userNames[i % userNames.length],
          avatar: userAvatars[i % userAvatars.length]
        }
      });
    }
    
    return photos;
  };
  
  const [photos, setPhotos] = useState<Photo[]>(generateCityPhotos());
  
  const handleLike = (photoId: string) => {
    setPhotos(photos.map(photo => {
      if (photo.id === photoId) {
        const newLiked = !photo.liked;
        return {
          ...photo,
          liked: newLiked,
          likes: newLiked ? photo.likes + 1 : photo.likes - 1
        };
      }
      return photo;
    }));
  };
  
  const handleShare = (photoId: string) => {
    toast({
      description: "Photo link copied to clipboard!",
    });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to a server
      // Here we'll just create a local URL
      const reader = new FileReader();
      reader.onload = () => {
        setUploadImage(file.name);
        setUploadPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleUpload = () => {
    if (!uploadCaption || !uploadPreview) {
      toast({
        title: "Error",
        description: "Please add a caption and select an image",
        variant: "destructive"
      });
      return;
    }
    
    // Add the new photo to the list
    const newPhoto: Photo = {
      id: `photo-${Date.now()}`,
      image: uploadPreview,
      caption: uploadCaption,
      location: cityName,
      date: "Just now",
      likes: 0,
      comments: 0,
      user: {
        name: "You",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
      }
    };
    
    setPhotos([newPhoto, ...photos]);
    setUploadCaption("");
    setUploadImage(null);
    setUploadPreview(null);
    setShowUploadModal(false);
    
    toast({
      description: "Your photo has been uploaded!",
    });
  };
  
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-heritage-dark mb-2">{cityName} Gallery</h2>
            <p className="text-heritage-gray">
              Explore {photos.length} user photos of {cityName}'s most beautiful spots and moments
            </p>
          </div>
          
          <Button 
            onClick={() => setShowUploadModal(true)}
            className="bg-heritage-terracotta hover:bg-heritage-terracotta/90"
          >
            <Upload className="mr-2 h-4 w-4" />
            Add Your Photos
          </Button>
        </div>
        
        {/* Pinterest-style masonry grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {photos.map((photo) => (
            <div key={photo.id} className="break-inside-avoid mb-4">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src={photo.image} 
                  alt={photo.caption}
                  className="w-full object-cover"
                />
                
                <div className="p-4">
                  <p className="font-medium mb-2">{photo.caption}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={photo.user.avatar} alt={photo.user.name} />
                        <AvatarFallback>{photo.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-heritage-gray">{photo.user.name}</span>
                    </div>
                    <span className="text-xs text-heritage-gray">{photo.date}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                      <button 
                        onClick={() => handleLike(photo.id)}
                        className={`flex items-center text-sm ${photo.liked ? 'text-red-500' : 'text-heritage-gray'}`}
                      >
                        <Heart className={`h-4 w-4 mr-1 ${photo.liked ? 'fill-red-500' : ''}`} />
                        {photo.likes}
                      </button>
                      
                      <button className="flex items-center text-sm text-heritage-gray">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {photo.comments}
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => handleShare(photo.id)}
                      className="text-heritage-gray hover:text-heritage-terracotta"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button variant="outline">
            Load More Photos
          </Button>
        </div>
      </div>
      
      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Upload Photo</h3>
              <button onClick={() => setShowUploadModal(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Caption</label>
                <Input
                  placeholder="Add a caption to your photo..."
                  value={uploadCaption}
                  onChange={(e) => setUploadCaption(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Photo</label>
                {uploadPreview ? (
                  <div className="relative">
                    <img 
                      src={uploadPreview} 
                      alt="Preview" 
                      className="w-full rounded-lg mb-2"
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setUploadImage(null);
                        setUploadPreview(null);
                      }}
                      className="absolute top-2 right-2 bg-white/80"
                    >
                      Change
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-heritage-gray/30 rounded-lg p-8 text-center">
                    <Camera className="h-8 w-8 mx-auto mb-2 text-heritage-gray/70" />
                    <p className="text-sm text-heritage-gray mb-3">
                      Drag photos here or click to upload
                    </p>
                    <Input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label htmlFor="photo-upload">
                      <Button variant="outline" asChild>
                        <span>Select Photo</span>
                      </Button>
                    </label>
                  </div>
                )}
              </div>
              
              <div className="pt-4">
                <Button 
                  onClick={handleUpload}
                  className="w-full bg-heritage-terracotta hover:bg-heritage-terracotta/90"
                  disabled={!uploadCaption || !uploadPreview}
                >
                  Upload Photo
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CityGallery;
