
import { Link } from 'react-router-dom';
import { MapPin, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-heritage-dark text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <MapPin className="h-6 w-6 text-heritage-terracotta" />
              <span className="font-bold text-xl">Heritage Trail</span>
            </Link>
            <p className="text-heritage-cream/70 text-sm mb-4">
              Discover the rich cultural heritage of Maharashtra through curated trails, expert recommendations, and engaging travel experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-heritage-cream/70 hover:text-heritage-terracotta">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-heritage-cream/70 hover:text-heritage-terracotta">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-heritage-cream/70 hover:text-heritage-terracotta">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-heritage-cream/70 hover:text-heritage-terracotta">Home</Link>
              </li>
              <li>
                <Link to="/city/mumbai" className="text-heritage-cream/70 hover:text-heritage-terracotta">Mumbai</Link>
              </li>
              <li>
                <Link to="/city/pune" className="text-heritage-cream/70 hover:text-heritage-terracotta">Pune</Link>
              </li>
              <li>
                <Link to="/city/nagpur" className="text-heritage-cream/70 hover:text-heritage-terracotta">Nagpur</Link>
              </li>
              <li>
                <Link to="/plan-trip" className="text-heritage-cream/70 hover:text-heritage-terracotta">Plan a Trip</Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-bold text-lg mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/#trending" className="text-heritage-cream/70 hover:text-heritage-terracotta">Trending Places</Link>
              </li>
              <li>
                <Link to="#" className="text-heritage-cream/70 hover:text-heritage-terracotta">Travel Journal</Link>
              </li>
              <li>
                <Link to="#" className="text-heritage-cream/70 hover:text-heritage-terracotta">Travel Tribes</Link>
              </li>
              <li>
                <Link to="#" className="text-heritage-cream/70 hover:text-heritage-terracotta">Photo Gallery</Link>
              </li>
              <li>
                <Link to="#" className="text-heritage-cream/70 hover:text-heritage-terracotta">Travel Quests</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail size={18} className="text-heritage-terracotta" />
                <span className="text-heritage-cream/70">contact@heritagetrail.com</span>
              </li>
              <li className="mt-4">
                <p className="text-heritage-cream/70 text-sm">
                  Subscribe to our newsletter for travel updates and exclusive offers.
                </p>
                <div className="mt-2 flex">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="px-3 py-2 text-sm text-heritage-dark bg-heritage-cream rounded-l-md focus:outline-none focus:ring-1 focus:ring-heritage-terracotta w-full"
                  />
                  <button className="bg-heritage-terracotta text-white px-4 py-2 rounded-r-md hover:bg-heritage-terracotta/90">
                    Subscribe
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-heritage-cream/10 mt-10 pt-6 text-center text-heritage-cream/50 text-sm">
          <p>&copy; {new Date().getFullYear()} Heritage Trail. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
