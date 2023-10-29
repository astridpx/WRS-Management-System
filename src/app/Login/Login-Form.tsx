"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ILogin } from "../../../typings";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  SuccessToast,
  ErrorToast,
  LoadingToast,
  DissmissToast,
} from "@/components/Toast/toast";
import { UAParser } from "ua-parser-js";
import { useQueryClient } from "react-query";

export default function LoginForm({ loading, setLoading }: any) {
  const parser = new UAParser();
  const queryClient = useQueryClient();

  // const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [data, setData] = useState<any>({
    username: "",
    password: "",
  });

  const HandleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // GET DEVICE INFO
    const { type, vendor, model } = await parser.getDevice(); // { model: '', type: '', vendor: '' }
    const { name: browserName, version: browserV } = await parser.getBrowser(); //{ name: '', version: '' }
    const { name: osName, version } = await parser.getOS(); //{ name: '', version: '' }

    const isDesktop = type ? false : true;
    const Device = type
      ? `${vendor} ${model} | ${browserName ? browserName : "Unknown"}`
      : `${browserName} - ${browserV} | ${osName} ${version}`;

    const newData = {
      ...data,
      isDesktop,
      deviceName: Device,
    };

    setLoading(true);
    await LoadingToast("Verifying account...");

    const res = await signIn("credentials", {
      ...newData,
      redirect: false,
    });

    console.log(res);
    if (!res?.error) {
      await DissmissToast();

      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
      await SuccessToast("Login Success");
      await LoadingToast("Initializing data...");

      // router.push("/");
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
        className="w-3/5  p-4 space-y-4 relative bg-blue-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-50 border border-gray-100"
        onSubmit={(e) => HandleLogin(e)}
      >
        <h1 className="text-center font-semibold text-3xl mb-12">Login</h1>

        <Select
          name="role"
          required
          onValueChange={(e) => {
            setData({ ...data, role: e });
          }}
        >
          <SelectTrigger className="text-center bg-white">
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Roles</SelectLabel>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="employee">Employee</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="space-y-2">
          <label htmlFor="uname" className="ml-2">
            Email
          </label>
          <Input
            type="text"
            name="username"
            required
            placeholder="Enter your email"
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
            // className="input input-bordered input-info w-full max-w-xs logininput "
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="ml-2">
            Password
          </label>
          <Input
            type="password"
            name="password"
            required
            placeholder="Enter your password"
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
            // className="input input-bordered input-info w-full max-w-xs logininput"
          />
        </div>
        <Button className="w-full" disabled={loading} type="submit">
          Login
        </Button>
      </form>
    </>
  );
}
