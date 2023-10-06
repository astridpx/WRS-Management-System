import Slim from "@/assets/items_img/slim_gallon.png";
import Round from "@/assets/items_img/rounded_gallon.png";
import Image from "next/image";
import { Row } from "@tanstack/react-table";
import { IGallons } from "../../../../typings";

// w   W
interface DataTableRowActionsProps<TData> {
  row: Row<TData & any>;
}

export function DataTableGallonColumn<TData>({ slim, round }: IGallons) {
  return (
    <>
      <div className="min-w-[20rem]">
        <header className="grid grid-cols-3 font-semibold text-center bg-gray-200">
          <h4 className="col-span-2 ">Item</h4>
          <h4>WRS</h4>
        </header>
        <div className="grid grid-cols-3 text-center">
          <div className=" flex items-center gap-4 col-span-2 ">
            <Image src={Slim} alt="Slim" height={25} className="" />

            <p>Slim Gallon</p>
          </div>
          <h4>{slim}</h4>
        </div>
        <div className="grid grid-cols-3 text-center">
          <div className=" flex items-center gap-4 col-span-2 ">
            <Image src={Round} alt="Slim" height={25} className="" />

            <p>Round Gallon</p>
          </div>
          <h4>{round}</h4>
        </div>
      </div>
    </>
  );
}
