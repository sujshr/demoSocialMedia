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
      .min(8, "Password must be at least 8 characters") // Reduced from 10 to 8
      .regex(
        /^(?=.*[a-zA-Z])(?=.*[0-9])/,
        "Password must contain at least one letter and one number" // Less strict: only letters and numbers
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
    console.log("called");
    setIsLoading(true);
    try {
      await axios.post(
        import.meta.env.VITE_REACT_APP_USER_REGISTRATION_URL,
        data
      );
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
    <div className="relative flex flex-col w-[90vw] max-w-[500px] mx-auto my-8 bg-gradient-to-r from-blue-50 to-purple-50">
      <Link to="/">
        <Button
          type="submit"
          className="fixed top-8 right-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:shadow-xl transition-shadow duration-300"
        >
          Home
        </Button>
      </Link>{" "}
      <SuccessAlert success={success} path={"Login"} />
      {isLoading && <ActionLoader action={"Registering..."} />}
      <CardHeader className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
          Create Your Account
        </h2>
        <CardDescription className="text-gray-500">
          Register yourself and get started!
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
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="text-black p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300"
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    Choose a unique username
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      className="text-black p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300"
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    Choose a strong password
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      className="text-black p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300"
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    Confirm your password
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:shadow-xl transition-shadow duration-300"
            >
              Register
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="self-center mt-4 text-gray-600">
        <p>Already have an account? </p>

        <Link to="/login" className="text-blue-600 hover:underline ml-2">
          Log in here
        </Link>
      </CardFooter>
    </div>
  );
}

export default RegistrationForm;
