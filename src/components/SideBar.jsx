import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavLink, useNavigate } from "react-router-dom";
import { Plus, LogOut } from "lucide-react";
import avatar from "../assets/avatar.jpeg";
import { Button } from "@/components/ui/button";

function SideBar({ handleOpenForm }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login");
  };

  return (
    <div className="hidden lg:flex fixed items-center left-0 top-0 flex-col gap-6 justify-end border-r border-gray-800 px-4 py-8 h-screen">
      <NavLink to="/profile">
        <div className="flex items-center space-x-2 hover:bg-gray-800 rounded-full">
          <Avatar>
            <AvatarImage src={avatar} alt="avatar" />
            <AvatarFallback>HI</AvatarFallback>
          </Avatar>
        </div>
      </NavLink>

      <Button
      variant="secondary"
        onClick={handleOpenForm}
        className="p-2 w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-100 font-medium border border-gray-700 hover:border-gray-600 transition-all duration-300 flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
      </Button>

      <Button
        onClick={handleLogout}
        className="p-3 rounded-full w-10 h-10 bg-red-500/20 hover:bg-red-500/30 text-red-200 font-medium border border-red-500/50 hover:border-red-500 transition-all duration-300 flex items-center gap-2"
      >
        <LogOut className="w-4 h-4" />
      </Button>
    </div>
  );
}

export default SideBar;
