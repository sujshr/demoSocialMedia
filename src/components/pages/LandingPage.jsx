import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  const navigate = useNavigate();

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const token = getCookie("token");

  const handleButtonClick = () => {
    if (token) {
      navigate("/feed");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <div onClick={handleButtonClick} className="fixed top-8 right-8">
        <Button
          type="submit"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold hover:shadow-xl transition-shadow duration-300"
        >
          {token ? "Feed" : "Register"}
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

        <p className="text-gray-500 text-lg mt-4">
          Post some status for us &#128516;
        </p>

        <button onClick={handleButtonClick} className="">
          <Button
            type="submit"
            className="mt-6 px-6 py-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold hover:shadow-xl transition-shadow duration-300"
          >
            {token ? "Go to Feed" : "Get Started"}
          </Button>
        </button>
      </main>
    </div>
  );
};

export default LandingPage;
