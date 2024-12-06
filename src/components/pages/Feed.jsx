import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import io from "socket.io-client";
import Navbar from "../NavBar";
import StatusCard from "../StatusCard";
import PostForm from "../forms/PostForm";
import SideBar from "../SideBar";

function Feed({ username }) {
  const [statuses, setStatuses] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchStatuses(token);
    }
  }, [navigate]);

  const fetchStatuses = async (token) => {
    try {
      const response = await axios.get(import.meta.env.VITE_REACT_APP_GET_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setStatuses(response.data);
    } catch (error) {
      setErrorMessage("Failed to load posts. Please try again.");
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_REACT_APP_SOCKET_URL);
    setSocket(newSocket);

    newSocket.on("postCreated", (newPost) => {
      console.log(newPost);
      setStatuses((prevStatuses) => [...prevStatuses, newPost]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => setIsFormOpen(false);

  return (
    <div className="relative md:border-x md:px-12 border-gray-500 min-h-screen w-screen max-w-[650px] mx-auto">
      <Navbar handleOpenForm={handleOpenForm} username={username} />

      <div className="min-h-screen">
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="max-w-[90vw] w-full mt-4 mx-auto pt-16">
          {statuses.length > 0 ? (
            statuses.map((status, index) => (
              <StatusCard
                key={index}
                postedBy={status.user.username}
                createdAt={status.createdAt}
                status={status.post.text}
                imageUrl={status.post.imageUrl}
              />
            ))
          ) : (
            <p className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 font-bold -translate-y-1/2">No posts available</p>
          )}
        </div>
        <PostForm isOpen={isFormOpen} onClose={handleCloseForm} />
      </div>

      <SideBar handleOpenForm={handleOpenForm}/>
    </div>
  );
}

export default Feed;
