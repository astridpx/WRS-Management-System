"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  SuccessToast,
  ErrorToast,
  LoadingToast,
  InfoToast,
  DissmissToast,
} from "@/components/Toast/toast";
import { useMutation, useQueryClient } from "react-query";
import { SendEmailMessage } from "../services/api";

function ContactForm() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const Data = {
    email,
    name,
    message,
  };

  // SEND EMAIL MESSAGE
  const { mutateAsync } = useMutation({
    mutationFn: () => SendEmailMessage(Data),
    onMutate: () => {
      LoadingToast("Sending email...");
    },
    onSuccess: (data: any) => {
      DissmissToast();
      SuccessToast(data?.message);

      setEmail("");
      setName("");
      setMessage("");
    },
    onError: (error: any) => {
      DissmissToast();
      ErrorToast(error?.response?.data?.message);
    },
  });

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await mutateAsync();
  };

  return (
    <>
      <div className="order-3 lg:order-none col-span-2 row-span-2 bg-white p-8 space-y-6 rounded-md shadow-light_blue/40 shadow-xl">
        <p className=" font-semibold">
          <span className="text-light_blue font-[900] mr-2">
            <strong>|</strong>
          </span>
          Send us a message
        </p>

        <form onSubmit={(e) => HandleSubmit(e)} className="space-y-6">
          <Input
            type="text"
            placeholder="Your Name or Company"
            className="shadow"
            required
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Your Email"
            className="shadow"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Textarea
            placeholder="your message..."
            className="h-[12rem] resize-none shadow"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="text-base tracking-wide font-semibold rounded-full py-4 px-6 btn-gradient shadow-lg shadow-blue-400 hover:shadow-xl hover:shadow-blue-400 duration-500 transition-shadow"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ContactForm;
