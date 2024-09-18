import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie to get the token from cookies

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CardContent, CardHeader, CardDescription } from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

import ActionLoader from "../alertsAndLoaders/ActionLoader";

const formSchema = z.object({
  status: z.string().min(1, { message: "Status is required" }),
});

function StatusForm({ isOpen, onClose }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "",
    },
  });

  const handleFormSubmit = async (data) => {
    setIsLoading(true);
    setErrorMessage("");

    const token = Cookies.get("token");

    if (!token) {
      setErrorMessage("You are not authorized. Please login.");
      setIsLoading(false);
      return;
    }

    try {
      await axios.post(import.meta.env.VITE_REACT_APP_POST_URL, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess(true);
      reset();
      onClose();
    } catch (error) {
      setErrorMessage("Failed to post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setErrorMessage("");
    reset();
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogContent
        className="w-[500px] max-w-[90vw] rounded-md bg-transparent border-none text-black"
        aria-describedby="status-form-description"
      >
        <div className="relative flex flex-col w-full mx-auto my-8 p-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
          {isLoading && <ActionLoader action={"Posting..."} />}

          <CardHeader className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
              Add a Post
            </h2>
            <CardDescription className="text-gray-600">
              Share a post with everyone!!
            </CardDescription>

            {errorMessage && (
              <h2 className="text-lg font-bold text-red-500 mt-4">
                {errorMessage}
              </h2>
            )}
          </CardHeader>

          <CardContent className="mt-6">
            <AlertDialogDescription id="status-form-description"></AlertDialogDescription>

            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="grid grid-cols-1 gap-6"
            >
              <div>
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="status"
                >
                  Status
                </label>
                <Textarea
                  id="status"
                  {...register("status")}
                  className="text-black p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300 resize-none h-32"
                />

                {errors.status && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.status.message}
                  </p>
                )}
              </div>

              <AlertDialogFooter>
                <AlertDialogCancel
                  type="button"
                  onClick={handleClose}
                  className="overflow-hidden"
                >
                  Cancel
                </AlertDialogCancel>
                <Button
                  type="submit"
                  className="py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  Post
                </Button>
              </AlertDialogFooter>
            </form>
          </CardContent>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default StatusForm;
