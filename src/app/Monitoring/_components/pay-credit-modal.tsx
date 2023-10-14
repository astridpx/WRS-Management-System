"use client";

import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "react-query";
import {
  SuccessToast,
  ErrorToast,
  LoadingToast,
  DissmissToast,
} from "@/components/Toast/toast";
import { MonitoringPageModalStore } from "@/lib/zustand/MonitoringPage-store/Modal-credit";
import { payCredit } from "../services/Api";

export const PayCreditModal = () => {
  const queryClient = useQueryClient();
  const { creditModal, toggleCreditModal, totalCredit, transId } =
    MonitoringPageModalStore();
  const [cash, setCash] = useState<number>(0);
  const [credit, setCredit] = useState<number>(0);
  const [change, setChange] = useState<number>(0);

  useEffect(() => {
    const uCredit = totalCredit - cash;
    const newCredit = cash > totalCredit ? 0 : uCredit;

    const Change = cash - totalCredit;
    const newChange = totalCredit > cash ? 0 : Change;

    setCredit(newCredit);
    setChange(newChange);
  }, [cash, setChange, totalCredit]);

  const { mutateAsync } = useMutation({
    mutationFn: payCredit,
    onMutate: () => {
      toggleCreditModal(false);
      LoadingToast("Loading payment...");
    },
    onSuccess: (data) => {
      DissmissToast();
      SuccessToast(data?.message);
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["credits"],
      });

      setCash(0);
    },
    onError: (error: any) => {
      DissmissToast();
      ErrorToast(error?.response?.data?.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (cash === 0) return ErrorToast("Payment amount is required.");

    const Data = {
      transId,
      credit,
    };

    await mutateAsync({ ...Data });
  };

  return (
    <>
      <section
        className={`${
          creditModal ? "block" : "hidden"
        } h-screen w-full overflow-y-auto bg-black/75 bg-opacity-95 absolute z-20  `}
      >
        <div className="h-max w-full flex items-center justify-center  py-4 ">
          <main className="relative  max-w-2xl w-[100%] p-4 bg-white dark:bg-dark_bg border border-gray-900/10 shadow-md rounded ">
            <div className="flex justify-between ">
              <h1 className="mb-4 font-semibold text-gray-900  ml-4 relative before:absolute before:-left-3 before:h-full before:w-2 before:bg-red-400">
                Credit Payment
              </h1>
              <IoClose
                size={22}
                className="place-self-start align-top cursor-pointer text-gray-500"
                onClick={() => {
                  toggleCreditModal(false);
                  setCash(0);
                }}
              />
            </div>

            <div className="flex justify-center">
              <form
                className=" w-[80%] font-semibold"
                onSubmit={(e) => handleSubmit(e)}
              >
                <section className="py-2 bg-gray-200 space-y-2 mb-4">
                  <div className="flex justify-between px-4">
                    <h1>Total Credit</h1>
                    <h1>₱{totalCredit.toFixed(2)}</h1>
                  </div>

                  <div className="flex justify-between items-center px-4">
                    <h1>Cash</h1>
                    <Input
                      type="number"
                      placeholder=""
                      min={0}
                      value={cash}
                      defaultValue={0}
                      onChange={(e) => {
                        const newValue = parseFloat(e.target.value);
                        if (isNaN(newValue)) {
                          setCash(0);
                        } else {
                          setCash(parseFloat(e.target.value));
                        }
                      }}
                      className="w-[50%] py-1 text-center"
                    />
                  </div>

                  <div className="flex justify-between items-center px-4">
                    <h1>Changed</h1>
                    <h1 className="w-[50%] py-2 bg-green-100 text-center">
                      P {change.toFixed(2)}
                    </h1>
                  </div>
                  <div className="flex justify-between items-center px-4">
                    <h1>Credit</h1>
                    <h1 className="w-[50%] py-2 bg-red-100 text-center">
                      P {credit.toFixed(2)}
                    </h1>
                  </div>
                </section>

                <div className="w-full flex justify-end">
                  <Button type="submit">Submit Payment</Button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};
