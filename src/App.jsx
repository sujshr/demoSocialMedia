import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/forms/LoginForm";
import Feed from "./components/pages/Feed";
import LandingPage from "./components/pages/LandingPage";
import Profile from "./components/pages/Profile";
import RegistrationForm from "./components/forms/RegistrationForm";

function App() {
  return (
    <div className="App overflow-x-hidden bg-gray-900 min-h-screen flex flex-col justify-center items-center text-white">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
