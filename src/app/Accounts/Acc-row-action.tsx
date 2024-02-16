"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AiOutlineEdit } from "react-icons/ai";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { BsTrash } from "react-icons/bs";
import {
  SuccessToast,
  ErrorToast,
  LoadingToast,
  DissmissToast,
} from "@/components/Toast/toast";
import { useMutation, useQueryClient } from "react-query";
import { editAccessAccount, deleteAccount } from "./services/api";

interface IChangeAccess {
  id: any;
  role: string;
  status: boolean;
}

export function AccountDataTableRowActions({
  id,
  role,
  status,
}: IChangeAccess) {
  const queryClient = useQueryClient();
  const [newRole, setRole] = useState(role);
  const [pass, setPass] = useState("");
  const [cpass, setCPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [active, setActive] = useState<boolean>(status);

  const editAccessMutation = useMutation({
    mutationFn: () =>
      editAccessAccount(
        {
          role: newRole,
          status: active,
          password: pass,
        },
        id
      ),
    onMutate: () => {
      LoadingToast("Updating account acccess...");
    },
    onSuccess: (data) => {
      DissmissToast();
      SuccessToast(data?.message);
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      setPass("");
      setCPass("");
      setShowPass(false);
    },
    onError: (error: any) => {
      DissmissToast();
      ErrorToast(error?.response?.data?.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteAccount(id),
    onMutate: () => {
      LoadingToast("Deleting account...");
    },
    onSuccess: (data) => {
      DissmissToast();
      SuccessToast(data?.message);
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      setPass("");
      setCPass("");
      setShowPass(false);
    },
    onError: (error: any) => {
      DissmissToast();
      ErrorToast(error?.response?.data?.message);
    },
  });

  // HANDLE EDIT ACCESS SUBMIT
  const HandleSubmit = async () => {
    if (pass !== cpass) return ErrorToast("Password didn't match.");

    await editAccessMutation.mutateAsync();
  };

  // HANDLE ACCOUNT DELETE
  const HandleDelete = async () => {
    await deleteMutation.mutateAsync();
  };

  return (
    <>
      <div className="flex items-center gap-x-6">
        <Sheet
          onOpenChange={(e) => {
            setPass("");
            setCPass("");
            setShowPass(false);
          }}
        >
          <SheetTrigger asChild>
            <AiOutlineEdit size={20} className="cursor-pointer" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Change Access</SheetTitle>
              <SheetDescription>
                Make changes to accounts here. Click save when you&apos;re done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Acc Role
                </Label>
                <Select
                  name="role"
                  defaultValue="edit"
                  value={newRole}
                  onValueChange={(e) => setRole(e)}
                >
                  <SelectTrigger className="ml-auto col-span-3">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="switch" className="text-right">
                  Status
                </Label>
                <div id="switch" className="flex items-center space-x-2">
                  <Switch
                    id="activate"
                    checked={active}
                    onCheckedChange={(e) => setActive(e ? true : false)}
                  />
                  <Label htmlFor="activate">
                    {active ? "Active" : "Deactivated"}
                  </Label>
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="pass" className="text-right">
                  Password
                </Label>
                <Input
                  type={showPass ? "text" : "password"}
                  id="pass"
                  className="col-span-3"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cpass" className="text-right">
                  Confirm
                </Label>
                <Input
                  type={showPass ? "text" : "password"}
                  id="cpass"
                  className="col-span-3"
                  value={cpass}
                  onChange={(e) => setCPass(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cpass" className="text-right invisible">
                  show pass
                </Label>
                <div className="col-span-3 flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={showPass}
                    onCheckedChange={(e) => setShowPass(e ? true : false)}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Show password
                  </label>
                </div>
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit" onClick={HandleSubmit}>
                  Save changes
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <BsTrash size={20} className="cursor-pointer" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from the server.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={HandleDelete}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}
