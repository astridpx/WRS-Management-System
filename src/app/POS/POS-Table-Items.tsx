import Image, { StaticImageData } from "next/image";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface PosItemProps {
  //   id: number;
  img: StaticImageData;
  //   type: string;
}

export default function POSItems({ img }: PosItemProps) {
  return (
    <>
      <div className="grid grid-cols-9 gap-x-1 place-content-center text-center py-2 ">
        <h5 className="text-sm ">1</h5>
        <div className="text-sm col-span-2 flex items-center gap-x-2">
          <Image src={img} alt="Slim " height={25} className="" />
          <p>Slim</p>
        </div>
        <h5 className="text-sm">20.00</h5>
        <input
          type="number"
          min={0}
          className="outline-none text-sm text-center"
        />
        <input
          type="number"
          min={0}
          className="outline-none text-sm text-center"
        />
        <input
          type="number"
          min={0}
          className="outline-none text-sm text-center"
        />
        <h5 className="text-sm">1000.00</h5>

        <Checkbox className="mx-auto " />
      </div>
    </>
  );
}
