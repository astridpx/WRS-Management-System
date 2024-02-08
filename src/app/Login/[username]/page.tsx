"use client";

import React, { useState, useEffect, useReducer } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BsFileEarmarkLock2, BsCheck2All } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { AiOutlineLock } from "react-icons/ai";
import { Stepper } from "./_components/Stepper";
import { StepsData } from "./Stepper-data";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQueryClient } from "react-query";
import {
  SuccessToast,
  ErrorToast,
  LoadingToast,
  InfoToast,
  DissmissToast,
} from "@/components/Toast/toast";
import { SendEmailCode, VerifyCode, ChangePassword } from "./services/api";

export default function ForgotPasswordPage() {
  const queryClient = useQueryClient();
  const [tab, setTab] = useState("email");
  const [step, setStep] = useState(1);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const userEmail = searchParams.get("email");
  const [data, setData] = useState<any>({
    email: "",
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    password: "",
    cpassword: "",
  });

  // Prevent Reloading the page or leave
  useEffect(() => {
    const HandleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      return (event.returnValue = "");
    };

    window.addEventListener("beforeunload", HandleBeforeUnload, {
      capture: true,
    });

    return () => {
      window.removeEventListener("beforeunload", HandleBeforeUnload, {
        capture: true,
      });
    };
  }, []);

  const HandleEmailParams = (email: any) => {
    // now you got a read/write object
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    current.set("email", email);

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  const HandleStepClick = (steps: any) => {
    setTab(steps);
    setStep(step + 1);
  };

  // SEND CODE ON EMAIL API REQUEST
  const SendEmailMutate = useMutation({
    mutationFn: () => SendEmailCode(userEmail ? { email: userEmail } : data),
    onMutate: () => {
      LoadingToast("Checking email...");
    },
    onSuccess: (ndata: any) => {
      DissmissToast();
      InfoToast(ndata?.message);
      HandleStepClick("otp");

      HandleEmailParams(data.email);
    },
    onError: (error: any) => {
      DissmissToast();
      ErrorToast(error?.response?.data?.message);
    },
  });

  // VERIFY CODE API REQUEST
  const VerifyCodeMutate = useMutation({
    mutationFn: () =>
      VerifyCode({
        email: userEmail,
        code: data.code1 + data.code2 + data.code3 + data.code4,
      }),
    onMutate: () => {
      LoadingToast("Verifying code...");
    },
    onSuccess: (ndata: any) => {
      DissmissToast();
      InfoToast(ndata?.message);
      HandleStepClick("password");

      HandleEmailParams(data.email);
    },
    onError: (error: any) => {
      DissmissToast();
      ErrorToast(error?.response?.data?.message);
    },
  });

  // CHANGE PASSWORD API REQUEST
  const ChangePasswordMutate = useMutation({
    mutationFn: () =>
      ChangePassword({
        email: userEmail,
        password: data.password,
        cpassword: data.cpassword,
      }),
    onMutate: () => {
      LoadingToast("Changing password...");
    },
    onSuccess: (ndata: any) => {
      DissmissToast();
      SuccessToast(ndata?.message);
      HandleStepClick("done");

      HandleEmailParams(data.email);
    },
    onError: (error: any) => {
      DissmissToast();
      ErrorToast(error?.response?.data?.message);
    },
  });

  const HandleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    Mutation: any
  ) => {
    e.preventDefault();
    await Mutation.mutateAsync();
  };

  return (
    <>
      <main className="h-screen w-full flex justify-center items-center ">
        <section className="h-[30rem]s w-[25rem]s bg-white shadow rounded-xl overflow-hidden ">
          <Tabs
            defaultValue="email"
            value={tab}
            className="w-[25rem] min-h-[17rem]s"
          >
            {/* Custom tab list / stepper */}
            <div className="p-5">
              <div className="mx-4 p-4">
                <div className="flex items-center">
                  <div className="flex items-center justify-center text-blue-500 relative">
                    <div className="rounded-full flex items-center justify-center transition duration-500 ease-in-out p-2 border-2 border-blue-500">
                      <HiOutlineMail size={18} />
                    </div>
                    <div className="absolute top-0 text-center mt-12 w-32 text-xs font-medium uppercase text-blue-500">
                      EMAIL
                    </div>
                  </div>
                  {StepsData.map((data: any) => {
                    return (
                      <>
                        <Stepper
                          key={data.id}
                          icon={data.icon}
                          title={data.title}
                          id={data.id}
                          step={step}
                        />
                      </>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* EMAIL STEP */}
            <TabsContent value="email" className="shadow-none border-none">
              <form
                action=""
                onSubmit={(e) => HandleSubmit(e, SendEmailMutate)}
              >
                <Card className="border-none">
                  <CardHeader>
                    <CardDescription>
                      Enter your valid email that is linked in your account.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@gmail.com"
                        name="email"
                        onChange={(e) =>
                          setData({ ...data, email: e.target.value })
                        }
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      type="submit"
                      disabled={SendEmailMutate.isLoading}
                    >
                      Submit
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </TabsContent>

            {/* OTP STEPP */}
            <TabsContent value="otp">
              <form
                action=""
                onSubmit={(e) => HandleSubmit(e, VerifyCodeMutate)}
              >
                <Card className="border-none">
                  <CardHeader>
                    <CardDescription>
                      Please provide the valid code we sent to verify it was
                      you.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2s">
                    <div className="flex justify-center gap-4 my-4">
                      <Input
                        className="w-12 h-12 text-center border rounded-md shadow-sm "
                        type="text"
                        maxLength={1}
                        pattern="[0-9]"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        onChange={(e) =>
                          setData({ ...data, code1: e.target.value })
                        }
                        required
                      />
                      <Input
                        className="w-12 h-12 text-center border rounded-md shadow-sm "
                        type="text"
                        maxLength={1}
                        pattern="[0-9]"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        onChange={(e) =>
                          setData({ ...data, code2: e.target.value })
                        }
                        required
                      />
                      <Input
                        className="w-12 h-12 text-center border rounded-md shadow-sm "
                        type="text"
                        maxLength={1}
                        pattern="[0-9]"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        onChange={(e) =>
                          setData({ ...data, code3: e.target.value })
                        }
                        required
                      />
                      <Input
                        className="w-12 h-12 text-center border rounded-md shadow-sm "
                        type="text"
                        maxLength={1}
                        pattern="[0-9]"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        onChange={(e) =>
                          setData({ ...data, code4: e.target.value })
                        }
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="space-x-4">
                    <Button
                      type="button"
                      variant={"outline"}
                      className="w-full"
                      disabled={VerifyCodeMutate.isLoading}
                      onClick={() => SendEmailMutate.mutateAsync()}
                    >
                      Resend OTP
                    </Button>
                    <Button
                      className="w-full"
                      type="submit"
                      disabled={VerifyCodeMutate.isLoading}
                    >
                      Verify
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </TabsContent>

            {/* PASSWORD STEP */}
            <TabsContent value="password">
              <form
                action=""
                onSubmit={(e) => HandleSubmit(e, ChangePasswordMutate)}
              >
                <Card className="border-none">
                  <CardHeader>
                    <CardDescription>
                      Change your password here. Make sure your password is
                      strong.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="npassword">New password</Label>
                      <Input
                        id="npassword"
                        type="password"
                        required
                        onChange={(e) =>
                          setData({ ...data, password: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="cpassword">Confirm password</Label>
                      <Input
                        id="cpassword"
                        type="password"
                        required
                        onChange={(e) =>
                          setData({ ...data, cpassword: e.target.value })
                        }
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      type="submit"
                      disabled={ChangePasswordMutate.isLoading}
                    >
                      Next
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </TabsContent>

            {/* FINISH BACK TO LOGIN PAGE */}
            <TabsContent value="done">
              <Card className="border-none  text-center pt-4">
                <h5 className="text-lg font-semibold text">
                  Password Successfully Changed
                </h5>
                <div className="mx-auto h-max w-max p-4 text-green-500 border-none border-green-500 rounded-full">
                  <BsCheck2All className="text-6xl" />
                </div>

                <CardFooter>
                  <Link href={"/Login"} className="w-full">
                    <Button
                      className="w-full"
                      // onClick={() => HandleStepClick("done")}
                    >
                      Back to Login
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        <Link
          href={"/"}
          className="absolute bottom-4 mx-auto text-blue-500 underline"
        >
          Back to Home
        </Link>
      </main>
    </>
  );
}
