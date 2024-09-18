import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login");
  };
  return (
    <div>
      <div className="fixed top-8 right-8">
        <Button
          onClick={handleLogout}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold hover:shadow-xl transition-shadow duration-300"
        >
          Logout
        </Button>
      </div>
      <main className="flex flex-col items-center justify-center text-center">
        <h1 className="text-7xl font-bold">
          <span className="text-yellow-400">H</span>
          <span className="text-red-400">e</span>
          <span className="text-green-400">l</span>
          <span className="text-green-400">l</span>
          <span className="text-red-400">o</span>
          <span className="text-red-300">.</span>
        </h1>

        <Link to={"/feed"}>
          <Button
            type="submit"
            className="mt-6 px-6 py-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold hover:shadow-xl transition-shadow duration-300"
          >
            Feed
          </Button>
        </Link>
      </main>
    </div>
  );
}

export default Profile;
