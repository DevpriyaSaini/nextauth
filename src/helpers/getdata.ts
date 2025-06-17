import user from "@/models/usermodel"
import { connection } from "@/dbConfig/dbConfig"
import { NextRequest,NextResponse } from "next/server"
import  jwt from "jsonwebtoken";


connection();
export async function getdata(request:NextRequest) {
    try {
        const token=request.cookies.get("token")?.value||"";
      const decode:any= jwt.verify(token,process.env. TOKEN_SECRET!);
      return decode.id;
    } catch (error:any) {
        return NextResponse.json({error: error.message},{
            status:500
        })
    }
}