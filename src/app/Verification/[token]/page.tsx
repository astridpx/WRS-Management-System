"use client";
import { Button } from "@/components/ui/button";
import {
  SuccessToast,
  ErrorToast,
  LoadingToast,
  DissmissToast,
  InfoToast,
} from "@/components/Toast/toast";
import { useMutation, useQueryClient, useQuery } from "react-query";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export default function EmailVerifyPage({
  params,
}: {
  params: { token: string };
}) {
  const [valid, setValid] = useState(1);
  const PasswordChangeSubmit = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(
        "/api/customers/email-verification/verify",
        { token: params?.token }
      );

      return data;
    },
    onMutate: () => {
      LoadingToast("Verifying account...");
    },
    onSuccess: (data) => {
      DissmissToast();
      SuccessToast(data?.message);
      setValid(2);
    },
    onError: (error: any) => {
      DissmissToast();
      ErrorToast(error?.response?.data?.message);
    },
  });

  // TOKEN VERIFICATION
  useEffect(() => {
    const decoded: any = jwtDecode(params.token);

    if (decoded?.exp < Date.now() / 1000) {
      console.log("expired");
      setValid(0);
    }
  }, [params.token]);

  const HandleVerify = async () => {
    await PasswordChangeSubmit.mutateAsync();
  };

  return (
    <>
      <div className="app font-sans min-w-screen min-h-screen bg-grey-lighter py-8 px-4">
        <div className=" max-w-md mx-auto">
          <div className=" bg-white p-8 shadow-md">
            <div className=" text-center tracking-wide border-b">
              <div className="text-red text-sm font-bold">
                GerChie Water Station
              </div>
              <h1 className="text-3xl pt-16 flex items-center justify-center">
                E-mail Confirmation
              </h1>
            </div>
            <div className=" py-8 border-b">
              <p>
                Hey, <br />
                <br />
                It looks like you just signed up for The App, that’s awesome!
                Can we ask you for email confirmation? Just click the button
                bellow.
              </p>
              <div className="w-full flex justify-start">
                {valid === 1 ? (
                  <Button onClick={HandleVerify} className=" my-6">
                    CONFIRM EMAIL ADRESS
                  </Button>
                ) : valid === 2 ? (
                  <Button className=" my-6 bg-green-600 hover:bg-green-600 text-white ">
                    Your Email is Verified
                  </Button>
                ) : (
                  <Button variant={"destructive"} disabled className=" my-6">
                    This Email is Expired
                  </Button>
                )}
              </div>
              <p className="text-sm">
                Keep Hydrated!
                <br /> Gerchie
              </p>
            </div>
            <div className="content__footer mt-8 text-center text-grey-darker">
              <h3 className="text-base sm:text-lg mb-4 font-semibold">
                Thanks for using The App!
              </h3>
              <p>gerchie.vercel.app</p>
            </div>
          </div>
          <div className="mail__meta text-center text-sm text-grey-darker mt-8">
            <div className="meta__help">
              <p className="leading-loose">
                Questions or concerns?{" "}
                <a href="#" className="text-grey-darkest">
                  gerchie@water.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
