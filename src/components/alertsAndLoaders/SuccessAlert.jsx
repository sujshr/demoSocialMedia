import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function SuccessAlert({ success, path }) {
  const getTitleAndDescription = (path) => {
    switch (path) {
      case "FeedL":
        return {
          title: "Login Successful",
          description: "Navigate to your feed.",
          to: "/feed",
        };
      case "FeedR":
        return {
          title: "Registered Successfully!!",
          description: "Navigate to your feed.",
          to: "/feed",
        };
      default:
        return {
          title: "Oops! Something went Wrong!",
          description: "Please try again later.",
          to: "/",
        };
    }
  };

  const { title, description, to } = getTitleAndDescription(path);

  return (
    <AlertDialog open={success}>
      <AlertDialogContent className="w-[500px] max-w-[90vw] rounded-md bg-[#09090B] border-none text-white text">
        <AlertDialogHeader className="w-full flex flex-col items-start">
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className=" w-full flex items-end">
          <Link to={to}>
            <AlertDialogAction>Feed</AlertDialogAction>
          </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default SuccessAlert;
