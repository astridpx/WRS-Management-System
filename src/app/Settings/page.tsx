"use client";

import React, { useState, useEffect } from "react";
import PageWrapper from "@/components/Page-Wrapper/Page-Wrapper";
import Image from "next/image";
import bg from "@/assets/bg-mountains.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AiOutlineCamera } from "react-icons/ai";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BsLaptop } from "react-icons/bs";
import { useMutation, useQueryClient, useQuery } from "react-query";
import {
  getMyProfile,
  changePassword,
  updateDetails,
  updateProfilePic,
} from "./services/api";
import {
  SuccessToast,
  ErrorToast,
  LoadingToast,
  DissmissToast,
} from "@/components/Toast/toast";
import { UserStore } from "@/lib/zustand/User/user.store";

export default function SettingsPage() {
  const { user } = UserStore();
  const queryClient = useQueryClient();
  const {
    isLoading,
    data: profile,
    isSuccess,
  } = useQuery({
    queryKey: ["myProfile"],
    queryFn: () => getMyProfile({ accId: user._id }),
  });
  const [tab, setTab] = useState("details");
  const [edit, setEdit] = useState(false);

  const [password, setPassword] = useState<any>({
    accId: user._id,
    currentPass: "",
    password: "",
    cpassword: "",
  });
  const [data, setData] = useState({
    profileId: user._id,
    fname: "",
    lname: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    if (isSuccess) {
      setData((prevData) => ({
        ...prevData, // Spread the previous state to keep profileId
        fname: profile.first_name,
        lname: profile.last_name,
        username: profile.username,
        email: profile?.email,
      }));
    }
  }, [
    isSuccess,
    profile?.email,
    profile?.first_name,
    profile?.last_name,
    profile?.username,
  ]);

  const PasswordChangeSubmit = useMutation({
    mutationFn: () => changePassword({ ...password }, user._id),
    onMutate: () => {
      LoadingToast("Updating password...");
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
      DissmissToast();
      SuccessToast(data?.message);
      setPassword({
        accId: user._id,
        currentPass: "",
        password: "",
        cpassword: "",
      });
    },
    onError: (error: any) => {
      DissmissToast();
      ErrorToast(error?.response?.data?.message);
    },
  });

  const EditProfileSubmit = useMutation({
    mutationFn: async () => await updateDetails({ ...data }, user._id),
    onMutate: () => {
      setEdit(false);
      LoadingToast("Updating profile...");
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
      DissmissToast();
      SuccessToast(data?.message);
    },
    onError: (error: any) => {
      DissmissToast();
      ErrorToast(error?.response?.data?.message);
    },
  });

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await PasswordChangeSubmit.mutateAsync();
  };

  const handleEditProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await EditProfileSubmit.mutateAsync();
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleProfileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <PageWrapper>
        <div className="relative">
          <section className="w-full h-[28rem] rounded bg-white overflow-hidden">
            <figure className="relative h-[63%] ">
              <div className="absolute  h-full w-full bg-blue-500/40 z-[1] px-4 flex items-end">
                <div className="relative h-max w-max bg-yellow-200 translate-y-[50%] rounded-full ">
                  <Avatar className="h-[7rem] w-[7rem] border-4  border-slate-200 shadow-sm ">
                    <AvatarImage
                      src={
                        isSuccess
                          ? profile.img
                          : "https://github.com/shadcn.png"
                      }
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="absolute bg-slate-200 bottom-3 right-0 rounded-full p-[6px] cursor-pointer shadow-sm">
                    <AiOutlineCamera size={20} className="text-gray-500" />
                  </div>
                </div>
              </div>
              <Image
                src={bg}
                height={500}
                width={500}
                alt="bg"
                className="h-full w-full absolute object-cover aspect-[16/9]"
              />
            </figure>

            <div className="flex justify-between items-end h-[35%] p-4  ">
              <div className="capitalize">
                <h5 className="text-slate-800 font-medium text-xl">
                  {isSuccess
                    ? `${profile.first_name} ${profile.last_name}`
                    : "Unknown"}
                </h5>
                <p className="text-slate-500 text-sm">
                  {isSuccess ? profile.role : "Unknown"}
                </p>
              </div>

              <Button
                variant={edit ? "secondary" : "default"}
                onClick={() => setEdit(true)}
                disabled={EditProfileSubmit.isLoading}
              >
                Edit Profile
              </Button>
            </div>
          </section>

          <section className="w-full h-max bg-white mt-4 rounded ">
            <Tabs
              value={tab}
              defaultValue="details"
              className="w-full h-full pb-4"
              // onValueChange={(e) => setTab(e)}
            >
              {/* <TabsList className="bg-inherit"> */}
              <header className="flex gap-x-4  text-sm text-blue-500 ">
                {/* <TabsTrigger value="details"> */}
                <div
                  className={`cursor-pointer p-4 flex text-center ${
                    tab === "details" && "select_center"
                  }`}
                  onClick={() => setTab("details")}
                >
                  <h5>Personal Details</h5>
                </div>
                {/* </TabsTrigger> */}
                {/* <TabsTrigger value="password"> */}
                <div
                  className={`cursor-pointer p-4 flex text-center ${
                    tab === "password" && "select_center"
                  }`}
                  onClick={() => setTab("password")}
                >
                  <h5>Change Password</h5>
                </div>

                {/* </TabsTrigger> */}
              </header>
              {/* </TabsList> */}
              <Separator />

              <TabsContent value="details">
                <form
                  action=""
                  className="grid grid-cols-2 p-4 gap-x-8 gap-y-4 "
                  onSubmit={(e) => handleEditProfile(e)}
                >
                  <div>
                    <Label htmlFor="fname">First Name</Label>
                    <Input
                      type="text"
                      id="fname"
                      name="fname"
                      value={data.fname}
                      placeholder="First Name"
                      onChange={(e) => handleProfileInput(e)}
                      readOnly={!edit}
                      className={`${!edit && "focus-visible:ring-transparent"}`}
                    />
                  </div>
                  <div className="">
                    <Label htmlFor="fname">Last Name</Label>
                    <Input
                      type="text"
                      id="lname"
                      name="lname"
                      value={data.lname}
                      placeholder="Last Name"
                      onChange={(e) => handleProfileInput(e)}
                      readOnly={!edit}
                      className={`${!edit && "focus-visible:ring-transparent"}`}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fname">Username</Label>
                    <Input
                      type="text"
                      id="username"
                      name="username"
                      value={data.username}
                      placeholder="Username"
                      onChange={(e) => handleProfileInput(e)}
                      readOnly={!edit}
                      className={`${!edit && "focus-visible:ring-transparent"}`}
                    />
                  </div>
                  <div className="">
                    <Label htmlFor="fname">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={data.email}
                      placeholder="Email"
                      onChange={(e) => handleProfileInput(e)}
                      readOnly={!edit}
                      className={`${!edit && "focus-visible:ring-transparent"}`}
                    />
                  </div>

                  <div
                    className={`${
                      edit ? "flex" : "hidden"
                    } col-span-full items-center justify-end space-x-4`}
                  >
                    <Button type="submit">Update</Button>
                    <Button
                      type="button"
                      className="bg-red-200 text-red-500 hover:bg-red-500 hover:text-slate-50"
                      onClick={() => setEdit(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="password">
                <form
                  action=""
                  className="grid grid-cols-3 p-4 gap-x-8 gap-y-4 "
                  onSubmit={(e) => handleChangePassword(e)}
                >
                  <div>
                    <Label htmlFor="currentPass">Current Password</Label>
                    <Input
                      type="password"
                      id="currentPass"
                      name="currentPass"
                      required
                      value={password.currentPass}
                      placeholder="Current Password"
                      onChange={(e) => handlePasswordInput(e)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">New Password</Label>
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      required
                      value={password.password}
                      placeholder="New Password"
                      onChange={(e) => handlePasswordInput(e)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cpassword">Confirm Password</Label>
                    <Input
                      type="password"
                      id="cpassword"
                      name="cpassword"
                      required
                      value={password.cpassword}
                      placeholder="Confirm Password"
                      onChange={(e) => handlePasswordInput(e)}
                    />
                  </div>
                  <div className="col-span-full flex items- justify-end space-x-4 relative">
                    <p className="text-blue-500 underline cursor-pointer text-[.8rem] absolute left-0 top-0">
                      Forgot Password?
                    </p>
                    <Button
                      type="submit"
                      disabled={PasswordChangeSubmit.isLoading}
                    >
                      Change Password
                    </Button>
                  </div>
                </form>

                <div className="mt-2 h-max w-full p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Login History</h3>
                    <h3 className="">Logout</h3>
                  </div>

                  <Separator className="my-4" />

                  <header className="grid grid-cols-7 bg-slate-200 font-semibold px-2 py-3">
                    <h2 className="col-span-2">Device</h2>
                    <h2>IP Address</h2>
                    <h2>Date</h2>
                    <h2 className="col-span-2">Address</h2>
                    <h2>Logout</h2>
                  </header>

                  <ScrollArea className="h-[17rem] ">
                    {Array.from(
                      {
                        length: 12,
                      },
                      () => {
                        return (
                          <>
                            <div className="grid grid-cols-7 p-2 text-slate-500">
                              <div className="flex items-center col-span-2 space-x-2">
                                <BsLaptop size={18} />
                                <p>Dell Inspiron 14</p>
                              </div>
                              <p>192.44.234.723</p>
                              <p>18 Dec, 2023</p>
                              <p className="col-span-2">
                                Los Angeles, United States
                              </p>
                              <p className="text-blue-500">Logout</p>
                            </div>
                          </>
                        );
                      }
                    )}
                  </ScrollArea>
                </div>
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </PageWrapper>
    </>
  );
}