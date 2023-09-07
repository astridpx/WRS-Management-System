import PageWrapper from "@/components/Page-Wrapper/Page-Wrapper";
import { Separator } from "@/components/ui/separator";
import Slim from "@/assets/items_img/slim_gallon.png";
import Rounded from "@/assets/items_img/rounded_gallon.png";
import POSItems from "./_components/POS-Table-Items";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import POSReceipt from "./_components/POS-Receipt";
import POSSearchUserModal from "./_components/POS-Modal-Search-User";
import { POSBTNHeader } from "./_components/POS-BTN-Header";
import { POSSelectCustomerBTN } from "./_components/POS-Select-Customer-BTN";
import POSModalReturnGallon from "./_components/POS-Modal-Return-Gallon";
import AddNewCustomerModal from "@/components/Add-Customer/Add-Customer-Modal";
import { PaymentModal } from "./_components/POS-Modal-Payment";

export default function POS_Page() {
  return (
    <>
      <POSSearchUserModal />
      <POSModalReturnGallon />
      <AddNewCustomerModal />
      <PaymentModal />

      <PageWrapper>
        <section className="relative border p-2">
          {/* BTN HEADER */}
          <POSBTNHeader />
          <Separator />

          <div className="py-4 h-[50rem]">
            <div className="flex gap-x-4">
              {/* LEFT BOX */}
              <div className="border-2 w-[65%] h-max">
                {/* leftboc head */}
                <POSSelectCustomerBTN />

                <Separator />

                {/* TABS HERE */}
                <Tabs defaultValue="gallon" className="pt-2 ">
                  <TabsList className="flex justify-start">
                    <TabsTrigger value="gallon">Gallon</TabsTrigger>
                    <TabsTrigger value="bottle">Bottle</TabsTrigger>
                  </TabsList>

                  <div className="bg-slate-100 w-full">
                    <header className="h-8 grid grid-cols-9 gap-x-1 place-content-center text-center font-semibold bg-sky-500">
                      <h4 className="text-sm ">#</h4>
                      <h4 className="text-sm col-span-2">ITEM</h4>
                      <h4 className="text-sm">PRICE</h4>
                      <h4 className="text-sm">CLI-GAL</h4>
                      <h4 className="text-sm">WRS-GAL</h4>
                      <h4 className="text-sm">FREE</h4>
                      <h4 className="text-sm">TOTAL</h4>
                      <h4 className="text-sm ">BUY</h4>
                    </header>
                    {/* Gallon TAB*/}
                    <TabsContent value="gallon">
                      <POSItems img={Slim} />
                      <POSItems img={Slim} />
                    </TabsContent>

                    {/* BOTTLE TAB */}
                    <TabsContent value="bottle">
                      <POSItems img={Rounded} />
                      <POSItems img={Rounded} />
                    </TabsContent>
                  </div>
                </Tabs>
              </div>

              {/* Ribht box */}
              <div className="w-[35%] border">
                <POSReceipt />
              </div>
            </div>
          </div>
        </section>
      </PageWrapper>
    </>
  );
}
