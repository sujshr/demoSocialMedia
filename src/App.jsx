import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/forms/LoginForm";
import RegistrationForm from "./components/forms/RegistrationForm";
import Feed from "./components/pages/Feed";
import LandingPage from "./components/pages/LandingPage";
import Profile from "./components/pages/Profile";

function App() {
  return (
    <div className="App bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen flex flex-col justify-center items-center text-white">
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
