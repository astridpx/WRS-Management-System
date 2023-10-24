import { NextRequest, NextResponse, userAgent } from "next/server";
import { headers } from "next/headers";
import axios from "axios";

/** @param {NextRequest} req */
export async function GET(req: NextRequest) {
  const res = await axios.get("https://api.ipify.org/?format=json");
  console.log(res.data);
  console.log(res.data.ip);

  // const apiURL = "https://ipgeolocation.abstractapi.com/v1/";
  // const apiKey = "28bc253a-ed77-4a93-98b8-cc252c6e7c0b";

  // const url =
  //   "https://apiip.net/api/check?ip=" + res.data.ip + "&accessKey=" + apiKey;

  // const response = await axios.get(url);
  // const result = response.data;

  return NextResponse.json({ ip: res.data.ip });
}
