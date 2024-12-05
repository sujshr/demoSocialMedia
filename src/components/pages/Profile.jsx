import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import avatar from "../../assets/avatar.jpeg";

const ProfilePage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 relative overflow-hidden flex items-center justify-center">
      <div className="fixed top-8 left-8 right-8 flex justify-between z-10">
        <Link to="/feed">
          <Button className="px-6 py-3 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-100 font-medium border border-gray-700 hover:border-gray-600 transition-all duration-300 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Feed
          </Button>
        </Link>
        <Button
          onClick={handleLogout}
          className="px-6 py-3 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-200 font-medium border border-red-500/50 hover:border-red-500 transition-all duration-300 flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" /> Logout
        </Button>
      </div>

      <div className="max-w-md w-full">
        <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50">
          <CardHeader className="text-center">
            <div className="relative w-52 h-52 mx-auto mb-4">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-gray-700 relative">
                <img src={avatar} className="w-full h-full object-cover" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-100">
              Hi There!
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
