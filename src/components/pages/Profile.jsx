import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import avatar from "../../assets/avatar.jpeg";
import StatusCard from "../StatusCard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ActionLoader from "../alertsAndLoaders/ActionLoader";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_REACT_APP_GET_USER_POSTS_URL, {
        headers: {
          Authorization: `Bearer ${document.cookie.split("token=")[1]}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch posts");

      const data = await response.json();
      setPosts(data.posts);
      setUsername(data.username);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_DELETE_POST_URL}/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${document.cookie.split("token=")[1]}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete post");
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 relative">
      <div className="fixed bg-gray-900 top-0 left-0 right-0 flex justify-between p-8 z-10">
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

      <div className="pt-24 max-w-2xl mx-auto">
        <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 mb-8">
          <CardHeader className="text-center">
            <div className="relative w-32 h-32 sm:w-52 sm:h-52 mx-auto mb-4">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-gray-700">
                <img
                  src={avatar}
                  className="w-full h-full object-cover"
                  alt="Profile"
                />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-100">
              Hi {username}!
            </CardTitle>
          </CardHeader>
        </Card>

        {loading && (
          <div className="text-center text-gray-400">Loading posts...</div>
        )}

        {error && (
          <div className="text-center text-red-400">Error: {error}</div>
        )}

        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post._id} className="relative">
              <StatusCard
                postedBy={post.user.username}
                createdAt={post.createdAt}
                status={post.post.text}
                imageUrl={post.post.imageUrl}
              />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-400"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-gray-800 text-white border-gray-700">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Post</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-400">
                      Are you sure you want to delete this post? This action
                      cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-700 text-white hover:bg-gray-600">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-500 hover:bg-red-600"
                      onClick={() => handleDelete(post._id)}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
