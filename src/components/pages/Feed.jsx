import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import io from "socket.io-client";
import Navbar from "../NavBar";
import StatusCard from "../StatusCard";
import StatusForm from "../forms/StatusForm";

function Feed() {
  const [statuses, setStatuses] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null); // Initialize socket state

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
      setStatuses(response.data);
    } catch (error) {
      setErrorMessage("Failed to load posts. Please try again.");
      console.error("Error fetching posts:", error);
    }
  };

  // Initialize the socket inside useEffect
  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_REACT_APP_SOCKET_URL);
    setSocket(newSocket);

    // Listen for post creation events
    newSocket.on("postCreated", (newPost) => {
      setStatuses((prevStatuses) => [newPost, ...prevStatuses]);
    });

    return () => {
      // Clean up the socket connection
      newSocket.disconnect();
    };
  }, []);

  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => setIsFormOpen(false);

  return (
    <div className="relative min-h-screen pt-16 w-screen max-w-[600px] flex text-center flex-col items-center text-white">
      <Navbar handleOpenForm={handleOpenForm} />
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div className="max-w-[90vw] w-full mt-4">
        {statuses.length > 0 ? (
          statuses.map((status, index) => (
            <StatusCard
              key={index}
              postedBy={status.postedBy}
              createdAt={status.createdAt}
              status={status.status}
            />
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
      <StatusForm isOpen={isFormOpen} onClose={handleCloseForm} />
    </div>
  );
}

export default Feed;
