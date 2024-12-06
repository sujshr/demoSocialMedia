import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight, Image } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const token = getCookie("token");

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col justify-center relative overflow-hidden">
      <div className="absolute right-0 top-[55%] -translate-y-1/2 mr-8 hidden lg:block">
        <div className="w-72 bg-gray-800 rounded-lg border border-gray-700 shadow-2xl">
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400" />
              <div className="flex-1">
                <div className="h-3 w-24 bg-gray-600 rounded" />
                <div className="h-2 w-16 bg-gray-700 rounded mt-2" />
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="h-32 bg-gray-700 rounded mb-3" />
          </div>
        </div>
      </div>

      <div className="absolute top-8 right-8 z-10">
        <Button
          onClick={() => {
            if (token) {
              navigate("/feed");
            } else {
              navigate("/register");
            }
          }}
          className="px-6 py-3 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-100 font-medium border border-gray-700 hover:border-gray-600 transition-all duration-300 flex items-center gap-2"
        >
          {token ? "View Feed" : "Join Now"}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      <main className="flex mt-24 flex-col items-center justify-center text-center z-10 px-4 lg:pr-96">
        <h1 className="text-6xl sm:text-7xl font-bold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Share Your Story
          </span>
        </h1>

        <p className="text-xl text-gray-400 max-w-md mx-auto leading-relaxed mb-12">
          Share some moments in our demo social space.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-12 max-w-3xl mx-auto">
          {[
            {
              icon: <MessageCircle className="w-6 h-6" />,
              title: "Post Updates",
              desc: "Share what's on your mind",
            },
            {
              icon: <Image className="w-6 h-6" />,
              title: "Rich Media",
              desc: "Add photos to your posts",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="p-4 rounded-xl bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300"
            >
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        <Button
          onClick={() => {
            if (token) {
              navigate("/feed");
            } else {
              navigate("/login");
            }
          }}
          className="px-8 py-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
        >
          {token ? "Go to Feed" : "Start Posting"}
          <ArrowRight className="w-5 h-5" />
        </Button>
      </main>
    </div>
  );
};

export default LandingPage;
