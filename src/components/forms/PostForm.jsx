import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Cookies from "js-cookie";
import { Image, X, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

import ActionLoader from "../alertsAndLoaders/ActionLoader";
import { uploadImageToFirebase } from "../../firebase";

// Modified schema to make both fields optional but require at least one
const formSchema = z
  .object({
    status: z
      .string()
      .max(500, { message: "Status must be less than 500 characters" })
      .optional(),
    image: z.instanceof(File).optional(),
  })
  .refine(
    (data) => {
      // Ensure at least one field is provided
      return data.status || data.image;
    },
    {
      message: "Please provide either a status message or an image",
      path: ["status"], // This will show the error under the status field
    }
  );

function PostForm({ isOpen, onClose }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "",
      image: undefined,
    },
  });

  // Watch both fields to disable submit button if both are empty
  const status = watch("status");
  const image = watch("image");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("Image must be less than 5MB");
        return;
      }

      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setErrorMessage("Only JPEG, PNG, GIF, and WebP images are allowed");
        return;
      }

      setValue("image", file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setErrorMessage("");
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setValue("image", undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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
      let imageUrl = null;

      if (data.image) {
        imageUrl = await uploadImageToFirebase(data.image);
      }

      await axios.post(
        import.meta.env.VITE_REACT_APP_POST_URL,
        {
          status: data.status || "",
          imageUrl: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      reset();
      setImagePreview(null);
      onClose();
    } catch (error) {
      setErrorMessage("Failed to post. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setErrorMessage("");
    setImagePreview(null);
    reset();
    onClose();
  };

  const isSubmitDisabled = !status?.trim() && !image;

  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogContent className="w-[500px] max-w-[95vw] rounded-2xl bg-transparent border-none">
        <div className="relative flex flex-col w-full mx-auto my-4 p-6 sm:p-8 bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl shadow-xl">
          {isLoading && <ActionLoader action="Posting..." />}

          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-100 mb-2">
              Create a Post
            </h2>
            <p className="text-gray-400">
              Share your thoughts or an image with the community
            </p>

            {errorMessage && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm font-medium">
                  {errorMessage}
                </p>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div>
              <Textarea
                {...register("status")}
                placeholder="What's on your mind?"
                className="bg-gray-900/50 border-gray-700 text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[150px] resize-none"
              />
              {errors.status && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.status.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-gray-200 flex items-center gap-2">
                  <Image className="w-5 h-5 text-gray-500" />
                  Share an image
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="text-blue-400 hover:text-blue-300 cursor-pointer"
                >
                  Upload
                </label>
              </div>

              {imagePreview && (
                <div className="relative mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500/70 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <AlertDialogFooter className="flex flex-col sm:flex-row gap-3">
              <AlertDialogCancel
                type="button"
                onClick={handleClose}
                className="w-full sm:w-auto bg-gray-700 text-gray-300 hover:bg-gray-600"
              >
                Cancel
              </AlertDialogCancel>
              <Button
                type="submit"
                disabled={isSubmitDisabled}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                Post
              </Button>
            </AlertDialogFooter>
          </form>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PostForm;
