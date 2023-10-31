"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  SuccessToast,
  ErrorToast,
  LoadingToast,
  DissmissToast,
  InfoToast,
} from "@/components/Toast/toast";
import { UAParser } from "ua-parser-js";
import { useQueryClient } from "react-query";
import axios from "axios";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { useSession } from "next-auth/react";
import { UserStore } from "@/lib/zustand/User/user.store";

export default function LoginForm() {
  const { clearUser, setUser } = UserStore();
  const parser = new UAParser();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [data, setData] = useState<any>({
    username: "",
    password: "",
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
      router.push("/Dashboard");
    }
  }, [loading, router, session, setUser]);

  // LOGIN SUBMIT
  const HandleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // GET DEVICE INFO
    const { type, vendor, model } = await parser.getDevice();
    const { name: browserName, version: browserV } = await parser.getBrowser();
    const { name: osName, version } = await parser.getOS();

    const isDesktop = type ? false : true;
    const Device = type
      ? `${vendor} ${model} | ${browserName ? browserName : "Unknown"}`
      : `${browserName} - ${browserV} | ${osName} ${version}`;

    setLoading(true);
    await LoadingToast("Verifying account...");

    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    console.log(res);

    if (!res?.error) {
      await DissmissToast();

      await LoadingToast("Tracking Data...");
      // const x = await axios.get("https://api.ipify.org/?format=json");
      // console.log(x.data.ip);

      // ABSTRACT API
      const ipData = await axios
        .get(
          "https://ipgeolocation.abstractapi.com/v1/?api_key=8fa7278f039e4c828bc7311219715d0a"
        )
        .then((res) => res.data)

        .catch((err: any) => {
          console.log("GEOLOCATION ERROR: ", err);
          ErrorToast("Error while tracking the location.");
        });

      // IPFIND API
      // const { data: ip2 } = await axios.get(
      //   `https://api.ipfind.com?ip=${x.data.ip}&auth=8bfec4d9-c47d-425e-8d11-569f93a0dc54`
      // );
      // console.log(ip2);

      console.log(ipData);

      const newData = {
        ...data,
        isDesktop,
        deviceName: Device,
        ip: ipData.ip_address,
        date: new Date(),
        time: new Date().toLocaleTimeString("PST"),
        address: `${ipData.city}, ${ipData.region} - ${ipData.country_code}`,
      };

      console.log(newData);

      try {
        const { data: res } = await axios.put(
          "/api/login/6513906b0ccefccfaf391982",
          { ...newData }
        );
        await DissmissToast();

        console.log(res.message);
        await queryClient.invalidateQueries({ queryKey: ["myProfile"] });

        setLoading(false);
        DissmissToast();
        await SuccessToast("Login Success");
        InfoToast("Data Successfully Initialized.");
        // router.push("/Dashboard");
      } catch (error) {
        console.log("IPGEOLOCATION ERROR: ", error);
      }
    }

    if (res?.error) {
      DissmissToast();
      setLoading(false);
      ErrorToast(res?.error);
    }
  };

  return (
    <>
      <form
        action=""
        className="mx-auto md:mx-0 max-w-[25.1rem] md:max-w-none  space-y-4 "
        onSubmit={(e) => HandleLogin(e)}
      >
        <div className=" w-full h-max ">
          <Input
            placeholder="Username"
            required
            name="username"
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className="relative w-full h-max  flex items-center">
          <Input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            className=""
            required
            name="password"
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          />
          {showPass ? (
            <VscEye
              size={20}
              className="absolute right-4 text-slate-500 cursor-pointer"
              onClick={() => setShowPass(false)}
            />
          ) : (
            <VscEyeClosed
              size={20}
              className={`${
                data.password.length > 0 ? "block" : "hidden"
              } absolute right-4 text-slate-500 cursor-pointer`}
              onClick={() => setShowPass(true)}
            />
          )}
        </div>
        <div className="text-end">
          <Link
            href={`/Login/${data.username ? data.username : "forgotpassword"}`}
            className="text-blue-400 underline text-sm"
          >
            Forgot Password
          </Link>
        </div>
        <Button disabled={loading} type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </>
  );
}
