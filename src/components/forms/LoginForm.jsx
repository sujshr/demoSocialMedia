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

import SuccessAlert from "../alertsAndLoaders/SuccessAlert";
import ActionLoader from "../alertsAndLoaders/ActionLoader";

const formSchema = z.object({
  username: z.string().min(1, { message: "Enter your username or email" }),
  password: z.string().min(1, { message: "Enter your password" }),
});

function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleFormSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        import.meta.env.VITE_REACT_APP_USER_LOGIN_URL,
        data
      );
      document.cookie = `token=${res.data.token}; path=/`;
      setSuccess(true);
    } catch (error) {
      const errorMessages = {
        404: "User not found. Please check your credentials.",
        500: "Server error. Please try again later.",
        401: "Invalid credentials. Please try again.",
        default: "An unexpected error occurred. Please try again.",
      };

      setErrorMessage(
        error.response
          ? errorMessages[error.response.status] || errorMessages.default
          : "Network error. Please check your connection."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col w-[90vw] max-w-[500px] mx-auto my-8 bg-gradient-to-r from-blue-50 to-purple-50">
      <Link to="/">
        <Button
          type="submit"
          className="fixed top-8 right-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:shadow-xl transition-shadow duration-300"
        >
          Home
        </Button>
      </Link>
      <SuccessAlert success={success} path={"FeedL"} />
      {isLoading && <ActionLoader action={"Logging in..."} />}
      <CardHeader className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
          Welcome Back
        </h2>
        <CardDescription className="text-gray-500">
          Log in to contunue!
        </CardDescription>
        {errorMessage && (
          <h2 className="text-lg font-bold text-red-500 mt-4">
            {errorMessage}
          </h2>
        )}
      </CardHeader>
      <CardContent className="mt-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="grid grid-cols-1 gap-6"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">
                    Username or Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="text-black p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300"
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    Enter your registered username or email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      className="text-black p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300"
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    Enter your password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:shadow-xl transition-shadow duration-300"
            >
              Log In
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="self-center mt-4 text-gray-600">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline ml-2">
          Register here
        </Link>
      </CardFooter>
    </div>
  );
}

export default LoginForm;
