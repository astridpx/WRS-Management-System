"use client";

import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { POSPaymentModal } from "@/lib/zustand/POSPage-store/Payment-Modal";
import POSBTNHeaderStore from "@/lib/zustand/POSPage-store/BTN-header";
import { useMutation, useQueryClient } from "react-query";
import {
  SuccessToast,
  ErrorToast,
  LoadingToast,
  DissmissToast,
} from "@/components/Toast/toast";
import { createTransaction } from "../services/Apis";

export const PaymentModal = () => {
  const queryClient = useQueryClient();
  const {
    paymentModal,
    togglePaymentModal,
    clearOrder,
    payment,
    order,
    service,
    date,
    time,
  } = POSPaymentModal();
  const { setCustomer, customer, setselectedCustomer } = POSBTNHeaderStore();
  const [discount, setDiscount] = useState<number>(0);
  const [cash, setCash] = useState<number>(0);
  const [credit, setCredit] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const cred = cash > total ? 0 : cash - total;
    setCredit(cred);

    const total_due = payment - discount;
    setTotal(total_due);
  }, [cash, payment, discount, total]);

  const { mutateAsync } = useMutation({
    mutationFn: createTransaction,
    onMutate: () => {
      togglePaymentModal(false);
      setselectedCustomer(false);
      LoadingToast("Creating new transaction...");
    },
    onSuccess: (data) => {
      DissmissToast();
      SuccessToast(data?.message);
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      setCustomer([]);
      clearOrder();
    },
    onError: (error: any) => {
      DissmissToast();
      ErrorToast(error?.response?.data?.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO the ordrs item.id must be a in a "item" key value
    const Data = {
      customer: customer._id,
      service,
      date,
      time,
      status: "To Ship",
      amount: total,
      discount,
      balance: credit < 0 ? Math.abs(credit) : credit,
      paid: credit > 0 ? false : true,
      orders: order.flatMap((order) => (order.qty > 0 ? [order] : [])),
    };

    if (!customer._id) return ErrorToast("Pls Select a customer");

    await mutateAsync({ ...Data });
  };

  return (
    <>
      <section
        className={`${
          paymentModal ? "block" : "hidden"
        } h-screen w-full overflow-y-auto bg-black/75 bg-opacity-95 absolute z-20  `}
      >
        <div className="h-max w-full flex items-center justify-center  py-4 ">
          <main className="relative  max-w-2xl w-[100%] p-4 bg-white dark:bg-dark_bg border border-gray-900/10 shadow-md rounded ">
            <div className="flex justify-between ">
              <h1 className="mb-4 font-semibold text-gray-900  ml-4 relative before:absolute before:-left-3 before:h-full before:w-2 before:bg-red-400">
                Confirm Payment
              </h1>
              <IoClose
                size={22}
                className="place-self-start align-top cursor-pointer text-gray-500"
                onClick={() => togglePaymentModal(false)}
              />
            </div>

            <div className="flex justify-center">
              <form
                className=" w-[80%] font-semibold"
                onSubmit={(e) => handleSubmit(e)}
              >
                <section className="py-2 bg-gray-200 space-y-2 mb-4">
                  <div className="flex justify-between px-4">
                    <h1>Sub Total</h1>
                    <h1>₱{payment.toFixed(2)}</h1>
                  </div>

                  <div className="flex justify-between items-center px-4">
                    <h1>Discount</h1>
                    <Input
                      type="number"
                      placeholder=""
                      min={0}
                      defaultValue={0}
                      onChange={(e) => {
                        const newValue = parseFloat(e.target.value);
                        if (isNaN(newValue)) {
                          setDiscount(0);
                        } else if (parseFloat(e.target.value) > payment) {
                          setDiscount(0);
                        } else {
                          setDiscount(parseFloat(e.target.value));
                        }
                      }}
                      className="w-[50%] py-1 text-center"
                    />
                  </div>
                </section>

                <section className="py-2 bg-gray-200 space-y-2 mb-4">
                  <div className="flex justify-between px-4">
                    <h1>Total Due</h1>
                    <h1>₱{total.toFixed(2)}</h1>
                  </div>

                  <div className="flex justify-between items-center px-4">
                    <h1>Cash</h1>
                    <Input
                      type="number"
                      placeholder=""
                      min={0}
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
                      P {(cash < total ? 0 : cash - total).toFixed(2)}
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
