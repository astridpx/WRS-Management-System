"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserStore } from "@/lib/zustand/User/user.store";
import { useMutation, useQueryClient, useQuery } from "react-query";
import {
  SuccessToast,
  ErrorToast,
  LoadingToast,
  DissmissToast,
  InfoToast,
} from "@/components/Toast/toast";
import { useState } from "react";
import axios from "axios";

export function ForceChangePasswordModal() {
  const { setUser, user } = UserStore();
  const [password, setPassword] = useState({
    accId: user?._id,
    currentPass: "test123",
    password: "",
    cpassword: "",
  });

  // Handle PASSWORD CHANGE SUBMIT
  const PasswordChangeSubmit = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(`/api/customers/profile/${user._id}`, {
        ...password,
      });

      return data;
    },
    onMutate: () => {
      LoadingToast("Updating password...");
    },
    onSuccess: (data) => {
      DissmissToast();
      SuccessToast(data?.message);
      setUser({ is_default_password_change: true });
      setPassword({
        currentPass: "test123",
        password: "",
        cpassword: "",
        accId: user?._id,
      });
    },
    onError: (error: any) => {
      DissmissToast();
      ErrorToast(error?.response?.data?.message);
    },
  });

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await PasswordChangeSubmit.mutateAsync();
  };

  return (
    <>
      <Dialog open={!user?.is_default_password_change} defaultOpen={false}>
        {/* <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
        {children}
    </DialogTrigger> */}
        <DialogContent className="sm:max-w-[425px]">
          <form action="" onSubmit={(e) => handlePasswordSubmit(e)}>
            <DialogHeader>
              <DialogTitle onClick={() => console.log(user)}>
                Update Password
              </DialogTitle>
              <DialogDescription>
                For security, please change your default password now. Click
                save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new_password" className="text-right">
                  Password
                </Label>
                <Input
                  type="password"
                  id="new_password"
                  name="password"
                  className="col-span-3"
                  placeholder="Enter new password"
                  onChange={(e) =>
                    setPassword({
                      ...password,
                      [e.target.name]: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cpassword" className="text-right">
                  Confirm Password
                </Label>
                <Input
                  type="password"
                  id="cpassword"
                  name="cpassword"
                  className="col-span-3"
                  placeholder="Confirm password"
                  onChange={(e) =>
                    setPassword({
                      ...password,
                      [e.target.name]: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
