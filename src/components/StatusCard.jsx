import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import image from "../assets/avatar.jpeg";
const highlightHashtags = (text) => {
  const regex = /#(\w+)/g;
  return text?.split(regex).map((part, index) =>
    index % 2 === 1 ? (
      <span key={index} className="text-blue-400">
        #{part}
      </span>
    ) : (
      part
    )
  );
};

function StatusCard({ postedBy, createdAt, status, imageUrl }) {
  console.log(createdAt)
  const formattedTime = format(new Date(createdAt), "MMM d, yyyy h:mm a");

  return (
    <Card className="my-4 border rounded-md bg-gray-900 text-white border-gray-700">
      <CardHeader>
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="User Avatar"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <CardTitle>{postedBy}</CardTitle>
            <p className="text-sm text-gray-400">{formattedTime}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="font-medium text-left">{highlightHashtags(status)}</p>
      </CardContent>

      {image && (
        <CardContent>
          <img src={imageUrl} alt="Post Media" className="w-full rounded-md" />
        </CardContent>
      )}
    </Card>
  );
}

export default StatusCard;
