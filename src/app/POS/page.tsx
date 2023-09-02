import PageWrapper from "@/components/Page-Wrapper/Page-Wrapper";
import { Button } from "@/components/ui/button";
import { BiSearchAlt2, BiHistory, BiUserPlus } from "react-icons/bi";
import { Separator } from "@/components/ui/separator";
import { FaUsers, FaGreaterThan, FaLessThan } from "react-icons/fa";
import { LiaGreaterThanSolid, LiaLessThanSolid } from "react-icons/lia";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Slim from "@/assets/items_img/slim_gallon.png";
import Rounded from "@/assets/items_img/rounded_gallon.png";
import POSItems from "./POS-Table-Items";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import POSReceipt from "./POS-Receipt";


export default function POS_Page() {
  return (
    <PageWrapper>
      <section className="relative border p-2">
        <div className="w-full py-2 mb-2  flex gap-2">
          <Button className="h-max w-40 p-2 flex gap-x-1">
            <span>
              <BiSearchAlt2 size={20} />
            </span>
            Customer
          </Button>
          <Button className="h-max w-40 p-2 flex gap-x-2 bg-yellow-500 hover:bg-yellow-500">
            <span>
              <BiHistory size={20} />
            </span>
            Return Gallon
          </Button>
          <Button className="h-max w-40 p-2 flex gap-x-2 bg-green-500 hover:bg-green-500">
            <span>
              <BiUserPlus size={20} />
            </span>
            New Customer
          </Button>
        </div>

        <Separator />

        <div className="py-4 h-[50rem]">
          <div className="flex gap-x-4">
            {/* LEFT BOX */}
            <div className="border-2 w-[65%] h-max">
              <header className="py-6 px-2  flex gap-x-4">
                <div className="flex-grow bg-red-300 flex items-center justify-center">
                  <button className="h-max w-max  text-2xl font-semibold flex  justify-between items-center gap-x-4">
                    <span>
                      <LiaLessThanSolid size={28} />
                    </span>
                    <span>
                      <FaUsers size={28} />
                    </span>
                    Select Customers
                    <span>
                      <LiaGreaterThanSolid size={28} />
                    </span>
                  </button>
                </div>

                <div className="w-40">
                  <Select name="role" defaultValue="deliver">
                    <SelectTrigger className="text-center ">
                      <SelectValue placeholder="Select Services" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="deliver">Deliver</SelectItem>
                        <SelectItem value="employee">Employee</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </header>
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
             <POSReceipt/>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
