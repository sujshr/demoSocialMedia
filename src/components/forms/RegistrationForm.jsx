import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CardContent,
  CardHeader,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { ArrowLeft, UserPlus, Lock, KeyRound } from "lucide-react";
import ActionLoader from "../alertsAndLoaders/ActionLoader";
import SuccessAlert from "../alertsAndLoaders/SuccessAlert";

const formSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must be less than 30 characters")
      .regex(
        /^[a-zA-Z0-9_-]{3,30}$/,
        "Can contain only letters, numbers, underscores, and dashes"
      ),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-zA-Z])(?=.*[0-9])/,
        "Password must contain at least one letter and one number"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function RegistrationForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleFormSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        import.meta.env.VITE_REACT_APP_USER_REGISTRATION_URL,
        data
      );
      document.cookie = `token=${res.data.token}; path=/`;
      setSuccess(true);
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data.message ||
        "Registration failed. Please try again later.";
      setErrorMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <Link to="/" className="fixed top-8 left-8 z-10">
        <Button className="px-6 py-3 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-100 font-medium border border-gray-700 hover:border-gray-600 transition-all duration-300 flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Home
        </Button>
      </Link>

      <SuccessAlert success={success} path={"FeedR"} />
      {isLoading && <ActionLoader action={"Registering..."} />}

      <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl shadow-xl p-8 relative z-10">
        <CardHeader className="text-center p-0 mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-100 mb-2">
            Create Your Account
          </h2>
          <CardDescription className="text-gray-400">
            Join our community and start sharing!
          </CardDescription>
          {errorMessage && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-sm font-medium">{errorMessage}</p>
            </div>
          )}
        </CardHeader>

        <CardContent className="p-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Username</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <UserPlus className="w-4 h-4 text-gray-500 absolute left-3" />
                        <Input
                          {...field}
                          className="bg-gray-900/50 border-gray-700 text-gray-100 pl-10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-12"
                        />
                      </div>
                    </FormControl>
                    <FormDescription className="text-gray-500 text-sm">
                      Choose a unique username
                    </FormDescription>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Password</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <Lock className="w-4 h-4 text-gray-500 absolute left-3" />
                        <Input
                          {...field}
                          type="password"
                          className="bg-gray-900/50 border-gray-700 text-gray-100 pl-10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-12"
                        />
                      </div>
                    </FormControl>
                    <FormDescription className="text-gray-500 text-sm">
                      Choose a strong password
                    </FormDescription>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <KeyRound className="w-4 h-4 text-gray-500 absolute left-3" />
                        <Input
                          {...field}
                          type="password"
                          className="bg-gray-900/50 border-gray-700 text-gray-100 pl-10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-12"
                        />
                      </div>
                    </FormControl>
                    <FormDescription className="text-gray-500 text-sm">
                      Confirm your password
                    </FormDescription>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-lg transition-all duration-300 hover:scale-105 h-12"
              >
                Create Account
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex justify-center mt-6 p-0">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-300 font-medium hover:underline ml-1"
            >
              Log in here
            </Link>
          </p>
        </CardFooter>
      </div>
    </div>
  );
}

export default RegistrationForm;
