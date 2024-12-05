import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { CheckCircle2 } from "lucide-react";

function SuccessAlert({ success, path }) {
  const getAlertConfig = (path) => {
    const configs = {
      FeedL: {
        title: "Welcome Back!",
        description: "Successfully logged in to your account",
        buttonText: "Go to Feed",
        to: "/feed",
      },
      FeedR: {
        title: "Welcome to the Community!",
        description: "Your account has been successfully created",
        buttonText: "Go to Feed",
        to: "/feed",
      },
      default: {
        title: "Oops! Something went wrong",
        description: "Please try again later",
        buttonText: "Go Home",
        to: "/",
      },
    };
    return configs[path] || configs.default;
  };

  const config = getAlertConfig(path);

  return (
    <AlertDialog open={success}>
      <AlertDialogContent className="w-[400px] max-w-[90vw] bg-gray-800/90 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-6">
        <AlertDialogHeader className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <div className="text-center space-y-2">
            <AlertDialogTitle className="text-2xl font-bold text-gray-100">
              {config.title}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              {config.description}
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6">
          <Link to={config.to} className="w-full">
            <AlertDialogAction className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-lg transition-all duration-300 hover:scale-105 h-12">
              {config.buttonText}
            </AlertDialogAction>
          </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default SuccessAlert;
