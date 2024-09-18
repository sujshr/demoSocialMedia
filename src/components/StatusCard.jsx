import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const highlightHashtags = (text) => {
  const regex = /#(\w+)/g;
  return text.split(regex).map((part, index) =>
    index % 2 === 1 ? (
      <span key={index} className="text-blue-400">
        #{part}
      </span>
    ) : (
      part
    )
  );
};

function StatusCard({ postedBy, createdAt, status }) {
  const formattedTime = format(new Date(createdAt), "MMM d, yyyy h:mm a");

  return (
    <Card className="my-4 p-6 w-full border rounded-md cursor-auto ">
      <CardTitle className="text-lg font-semibold mb-6">
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="User Avatar"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <p>{postedBy}</p>
            <p>
              <p className="text-sm text-gray-400">{formattedTime}</p>
            </p>
          </div>
        </div>
      </CardTitle>

      <p className="mt-2 text-left font-medium">{highlightHashtags(status)}</p>
    </Card>
  );
}

export default StatusCard;
