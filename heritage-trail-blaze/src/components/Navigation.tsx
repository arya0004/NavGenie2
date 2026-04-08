
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Menu, X, Award, BookOpen, Users, User } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white py-4 px-6 sticky top-0 z-50 shadow-sm">
   {/* <nav className="bg-black text-white py-4 px-6 fixed top-0 w-full z-50 shadow-md backdrop-blur-md"> */}
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <MapPin className="h-6 w-6 text-blue-iris" />
          <span className="font-bold text-xl">Heritage Trail</span>
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-blue-iris transition-colors">
            Home
          </Link>
          <Link to="/plan-trip" className="hover:text-blue-iris transition-colors">
            Plan a Trip
          </Link>
          <Link to="/quests" className="hover:text-blue-iris transition-colors flex items-center gap-1">
            <Award size={18} />
            Quests
          </Link>
          <Link to="/tribes" className="hover:text-blue-iris transition-colors flex items-center gap-1">
            <Users size={18} />
            Tribes
          </Link>
          <Link to="/blogs" className="hover:text-blue-iris transition-colors flex items-center gap-1">
            <BookOpen size={18} />
            Blogs
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/profile">
            <Button variant="outline" className="border-blue-iris text-blue-iris hover:bg-blue-iris hover:text-white">
              <User size={18} className="mr-2" />
              Profile
            </Button>
          </Link>
          <Button className="bg-blue-venice hover:bg-blue-venice/90 text-white">
            Sign Up
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-16 left-0 right-0 p-4 bg-blue-mystic shadow-md md:hidden z-50">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="px-4 py-2 hover:bg-blue-venice/10 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/plan-trip" 
                className="px-4 py-2 hover:bg-blue-venice/10 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Plan a Trip
              </Link>
              <Link 
                to="/quests" 
                className="px-4 py-2 hover:bg-blue-venice/10 rounded-md flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <Award size={18} />
                Quests
              </Link>
              <Link 
                to="/tribes" 
                className="px-4 py-2 hover:bg-blue-venice/10 rounded-md flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <Users size={18} />
                Tribes
              </Link>
              <Link 
                to="/blogs" 
                className="px-4 py-2 hover:bg-blue-venice/10 rounded-md flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <BookOpen size={18} />
                Blogs
              </Link>
              <Link 
                to="/profile" 
                className="px-4 py-2 hover:bg-blue-venice/10 rounded-md flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <User size={18} />
                Profile
              </Link>
              <hr className="border-blue-venice/20" />
              <Link 
                to="/login" 
                className="px-4 py-2 hover:bg-blue-venice/10 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Log In
              </Link>
              <Link 
                to="/signup" 
                className="px-4 py-2 bg-blue-venice hover:bg-blue-venice/90 rounded-md text-center"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
