import { Notif } from "@/lib/mongodb/model/Notifications.model";

export const CreateItemStockNotif = async (newItem: any) => {
  console.log(newItem.stock <= newItem.reorder);

  if (newItem.stock <= newItem.reorder) {
    const createNotif = {
      category: "item",
      title: ` ${newItem.name} - ${newItem.category}`,
      body: `Your item has reach the minimum quantity - ${newItem.stock}`,
      img: newItem.img,
      time: new Date().toLocaleTimeString("PST"),
      date: new Date(),
    };

    const notify = await Notif.create(createNotif);
    if (notify) {
      console.log("Notification successfully created");
    } else {
      console.error("Error creating notification [minimum]");
    }
  }

  return;
};
