import { Acc } from "@/lib/mongodb/model/Accounts.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import axios from "axios";

export async function POST(req: Request) {
  const { username, password, isDesktop, deviceName } = await req.json();

  console.log(isDesktop);
  console.log(deviceName);

  try {
    const user = await Acc.findOne({ username }).exec();

    if (!user)
      return NextResponse.json(
        { message: "Username not found" },
        { status: 404 }
      );

    const validPassword = await bcrypt.compare(password, user.hash_password);

    if (!validPassword)
      return NextResponse.json(
        { message: "Invalid password." },
        { status: 400 }
      );

    // Check if acc is deactivated
    if (!user.active)
      return NextResponse.json(
        { message: "Sorry, this account is deactivated." },
        { status: 404 }
      );

    // GET IP ADDRESS
    // const res = await axios.get("https://api.ipify.org/?format=json");
    // console.log(res.data.ip);

    // IPFIND
    // const { data: ipData } = await axios.get(
    //   "https://api.ipfind.com?ip=8.8.8.8&auth=8bfec4d9-c47d-425e-8d11-569f93a0dc54"
    //   );
    //   console.log(ipData);

    // ABSTRACT API
    await axios
      .get(
        "https://ipgeolocation.abstractapi.com/v1/?api_key=8fa7278f039e4c828bc7311219715d0a"
      )
      .then(async (ipData: any) => {
        console.log(ipData.data);
        
        const x = await Acc.findOneAndUpdate(
          { username },
          {
            last_active: new Date(),
            $push: {
              login_history: {
                isDesktop: isDesktop ? isDesktop : "Unknown",
                deviceName: deviceName ? deviceName : "Unknown",
                ip: ipData.data.ip_address,
                date: new Date(),
                address: `${ipData.data.city}, ${ipData.data.region} - ${ipData.data.country_code}`,
              },
            },
          }
        );

        if (x) {
          console.log("login logged");
        }
      })
      .catch((err) => console.log(err));

    // console.log(ipData);

    // Create a new user object without the hash_password property
    const sanitizedUser = { ...user.toObject() };
    delete sanitizedUser.hash_password;

    return NextResponse.json({
      message: "Login Successfull",
      isAuth: true,
      user: sanitizedUser,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal server error!" },
      { status: 500 }
    );
  }
}
