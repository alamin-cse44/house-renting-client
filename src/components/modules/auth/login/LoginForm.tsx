"use client";

import { UseFormReturn, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, Suspense, useEffect, useState } from "react";
import { toast } from "sonner";
import { loginUser, getCurrentUser } from "@/services/AuthService";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { loginSchema } from "./loginValidation";
import { useUser } from "@/context/UserContext";
import Shell from "@/components/ui/core/Shell";

// Define form field types
interface LoginFormValues {
  email: string;
  password: string;
}

// Define props type
interface LoginFormProps {
  form: UseFormReturn<LoginFormValues>;
  setUser: Dispatch<SetStateAction<any>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  router: ReturnType<typeof useRouter>;
}

const userCredentials = {
  admin: {
    email: "alamin23712@gmail.com",
    password: "pass1234",
  },
  landLord: {
    email: "shafin@gmail.com",
    password: "12345678",
  },
  tenant: {
    email: "polash@gmail.com",
    password: "12345678",
  },
};

const LoginForm = () => {
  // Explicitly type the useForm hook
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { setUser, setIsLoading } = useUser();
  const router = useRouter();

  return (
    <Suspense fallback={null}>
      <LoginFormContent
        form={form}
        setUser={setUser}
        setIsLoading={setIsLoading}
        router={router}
      />
    </Suspense>
  );
};

const LoginFormContent = ({
  form,
  setUser,
  setIsLoading,
  router,
}: LoginFormProps) => {
  const [role, setRole] = useState<"admin" | "landLord" | "tenant">("admin");

  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirectPath");

  const {
    formState: { isSubmitting },
  } = form;

  // Set default values when role changes
  useEffect(() => {
    const { email, password } = userCredentials[role];
    form.setValue("email", email);
    form.setValue("password", password);
  }, [role, form]);

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      const res = await loginUser(data);
      const user = await getCurrentUser();
      setUser(user);
      setIsLoading(false);
      if (res.success) {
        toast.success(res?.message);
        router.push(redirectUrl || "/");
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Shell className="flex-grow max-w-md w-full">
      <div className="border border-gray-300 rounded-xl p-5">
        <div className="text-center">
          <h1 className="text-xl font-semibold my-2">Login</h1>
        </div>

        {/* Radio Buttons */}
        <div className="flex justify-center gap-4 mb-4">
          {["admin", "landLord", "tenant"].map((type) => (
            <label key={type} className="flex items-center gap-1 text-sm">
              <input
                type="radio"
                name="userRole"
                value={type}
                checked={role === type}
                onChange={() => setRole(type as any)}
              />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
          ))}
        </div>

        {/* Form */}
        <Form {...form}>
          <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="test@gmail.com" {...field} />
                  </FormControl>
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
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full mt-5" type="submit">
              {isSubmitting ? "Login..." : "Login"}
            </Button>
          </form>
        </Form>

        <p className="text-sm text-gray-600 text-center my-3">
          Do not have any account?{" "}
          <Link href="/register" className="text-primary">
            Register
          </Link>
        </p>

        <Link href="/">
          <Button className="w-full mt-5 bg-black hover:bg-black" type="submit">
            GO BACK TO THE HOME PAGE
          </Button>
        </Link>
      </div>
    </Shell>
  );
};

export default LoginForm;
