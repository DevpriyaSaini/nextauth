import { connection } from "@/dbConfig/dbConfig";
import user from "@/models/usermodel"
import { NextRequest,NextResponse } from "next/server";
import { getdata } from "@/helpers/getdata";
import next from "next";

 connection();
  export async function POST(request:NextRequest) {
    //extract data from token
  const userId=  await getdata(request);
  const users=user.findOne({_id:userId}).select("-password")
return NextResponse.json({
    msg:"user found",
    data:users
})
  }