"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Bg from "@/assets/customer-login-bg-1.jpg";
// import Bg from "@/assets/pinay.jpg";
import {
  SuccessToast,
  ErrorToast,
  LoadingToast,
  DissmissToast,
  InfoToast,
} from "@/components/Toast/toast";
import { signIn, useSession } from "next-auth/react";
import { useQueryClient } from "react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserStore } from "@/lib/zustand/User/user.store";

export default function CustomerLogin() {
  const { clearUser, setUser } = UserStore();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [data, setData] = useState<any>({
    username: "",
    password: "",
    role: "guest",
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  // CHECK IF THERE IS A SESSION
  useEffect(() => {
    if (session && loading === false) {
      const User = session.user;

      setUser({ ...User });
      setLoading(false);
      DissmissToast();
      InfoToast("Data Successfully Initialized.");
      router.push(User?.role === "guest" ? "/Client" : "/Dashboard");
    }
  }, [loading, router, session, setUser]);

  // HANDLE CUSTOMER LOGIN
  const HandleLoginCustomer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await LoadingToast("Verifying account...");

    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (!res?.error) {
      await DissmissToast();
      DissmissToast();
      SuccessToast("Login Success");
      // router.push("/Dashboard");
    }

    if (res?.error) {
      DissmissToast();
      setLoading(false);
      ErrorToast(res?.error);
    }
  };

  return (
    <div className="w-full lg:grid h-screen lg:grid-cols-2 bg-white ">
      <div className="flex h-screen items-center justify-center py-12">
        <div className="mx-auto grid w-[80%] md:w-[50%] lg:w-[60%] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance  text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <form className="grid gap-4" onSubmit={(e) => HandleLoginCustomer(e)}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                name="username"
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link> */}
              </div>
              <Input
                id="password"
                type="password"
                required
                name="password"
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              Login
            </Button>
            {/* <Button variant="outline" className="w-full">
              Login with Google
            </Button> */}
          </form>
          <div className="mt-4 text-center text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden h-screen bg-muted lg:block">
        <Image
          src={Bg.src}
          alt="Image"
          width="1920"
          height="1080"
          unoptimized
          className="h-full w-full object-cover brightness-90"
        />
      </div>
    </div>
  );
}
