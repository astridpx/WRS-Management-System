import Slim from "@/assets/items_img/slim_gallon.png";
import Round from "@/assets/items_img/rounded_gallon.png";
import Image from "next/image";
import { Row } from "@tanstack/react-table";
import { IGallons, IUser } from "../../../../typings";

export function DataTableGallonColumn({
  borrowed_gal,
}: {
  borrowed_gal: IUser["borrowed_gal"];
}) {
  return (
    <>
      <div className="min-w-[20rem]">
        <header className="grid grid-cols-3 font-semibold text-center bg-gray-200">
          <h4 className="col-span-2 ">Item</h4>
          <h4>WRS</h4>
        </header>
        {Array.isArray(borrowed_gal)
          ? borrowed_gal?.map((d) => {
              return (
                <>
                  {typeof d.item !== "string" ? (
                    <div
                      key={d?.item?._id}
                      className="grid grid-cols-3 text-center"
                    >
                      <div className=" flex items-center gap-4 col-span-2 ">
                        <Image
                          src={d?.item?.img ? d?.item?.img : ""}
                          alt="Slim"
                          height={30}
                          width={30}
                          className="object-contain aspect-[4/3]"
                        />

                        <p>{d?.item?.name}</p>
                      </div>
                      <h4>{d.borrowed}</h4>
                    </div>
                  ) : null}
                </>
              );
            })
          : null}
      </div>
    </>
  );
}
