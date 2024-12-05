import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft } from "lucide-react";
import avatar from "../assets/avatar.jpeg";

const Navbar = ({ handleOpenForm }) => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollY;

      if (currentScrollTop > lastScrollTop) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 
        bg-gray-900 border-b border-gray-700
        transition-transform duration-300
        ${showNavbar ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <NavLink to="/" className="text-2xl font-bold text-blue-500">
            <Button className="px-6 py-3 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-100 font-medium border border-gray-700 hover:border-gray-600 transition-all duration-300 flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Home
            </Button>
          </NavLink>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            onClick={handleOpenForm}
            variant="outline"
            className="mr-4 text-gray-700 transition-colors"
          >
            Post
          </Button>

          <NavLink to={"/profile"}>
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src={avatar} alt={`avatar`} />
                <AvatarFallback>HI</AvatarFallback>
              </Avatar>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
