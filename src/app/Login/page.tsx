"use client";

import Image from "next/image";
import peoples from "../../assets/people-cofee.svg";
import bg from "../../assets/bg-login.jpg";
import blob from "../../assets/login-form-blob.png";
import LoginForm from "./Login-Form";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { UserStore } from "@/lib/zustand/User/user.store";
import { useRouter } from "next/navigation";
import {
  SuccessToast,
  ErrorToast,
  LoadingToast,
  DissmissToast,
} from "@/components/Toast/toast";

export default function LoginPage() {
  const { clearUser, setUser } = UserStore();
  const router = useRouter();
  const { data: session, status, update } = useSession();

  console.log(session);

  if (session) {
    const User = session.user;
    setUser({ ...User });

    DissmissToast();
    SuccessToast("Data Successfully Nitialized.");
    router.push("/");
  }

  return (
    <>
      <main className="h-screen w-full ">
        <section className="min-h-screen h-screen w-full grid grid-cols-2 relative">
          <Image
            src={bg}
            alt="bg"
            className="absolute bg-cover bg-center bg-no-repeat h-screen w-full -z-10 opacity-90s blsur-sm "
          />
          <div className=" flex items-center  ">
            <Image
              src={peoples}
              alt="people"
              className="bg-cover bg-center bg-no-repeat  "
            />
          </div>

          {/* Login form */}
          <div className="flex justify-center items-center  ">
            <Image
              src={blob}
              alt="blob"
              // height={300}
              // width={300}
              className="absolute bg-center h-[33rem] w-[33rem] -z-10 opacity-75 blur-sm "
            />
            <LoginForm />
          </div>
        </section>
      </main>
    </>
  );
}
