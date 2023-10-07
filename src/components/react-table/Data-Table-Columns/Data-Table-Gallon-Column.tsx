import Slim from "@/assets/items_img/slim_gallon.png";
import Round from "@/assets/items_img/rounded_gallon.png";
import Image from "next/image";
import { Row } from "@tanstack/react-table";
import { IGallons } from "../../../../typings";

export function DataTableGallonColumn(borrowed_gal: any) {
  return (
    <>
      <div className="min-w-[20rem]">
        <header className="grid grid-cols-3 font-semibold text-center bg-gray-200">
          <h4 className="col-span-2 ">Item</h4>
          <h4>WRS</h4>
        </header>
        {Array.isArray(borrowed_gal?.borrowed_gal)
          ? borrowed_gal?.borrowed_gal?.map((d: any) => {
              return (
                <>
                  <div
                    key={d.item._id}
                    className="grid grid-cols-3 text-center"
                  >
                    <div className=" flex items-center gap-4 col-span-2 ">
                      <Image
                        src={d.item.img}
                        alt="Slim"
                        height={30}
                        width={30}
                        className="object-contain aspect-[4/3]"
                      />

                      <p>{d.item.name}</p>
                    </div>
                    <h4>{d.borrowed}</h4>
                  </div>
                </>
              );
            })
          : null}
      </div>
    </>
  );
}

// const x={
//   item: {
//     _id: '651f4fdc4885c1e32472bd6e',
//     name: 'Slim',
//     img: 'https://utfs.io/f/58bd7b38-edf7-4650-a250-bce4a9b8d67e-n526wr.png',
//     category: 'container',
//     pos_item: true,
//     reorder: 40,
//     price: 20,
//     buy_price: 150,
//     createdAt: '2023-10-06T00:07:57.027Z',
//     updatedAt: '2023-10-06T02:03:58.900Z',
//     __v: 0,
//     stock: 100
//   },
//   borrowed: 6,
//   last_return: '2023-10-07T03:01:19.702Z',
//   _id: '6520d0ec02b4ed97eed3f7be'
// },
