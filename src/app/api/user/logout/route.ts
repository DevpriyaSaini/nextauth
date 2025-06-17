import { connection } from "@/dbConfig/dbConfig";
import user from "@/models/usermodel"
import { NextRequest,NextResponse } from "next/server";
import jwt from "jsonwebtoken";
const tokenSecret = process.env.TOKEN_SECRET;

 connection();

 export async function GET(request:NextRequest) {
try {
    const response=NextResponse.json({
        msg:"logout successfully",
        success:true,
    })  
    response.cookies.set("token","",{
        httpOnly:true,
        expires:new Date(0)
    })  
    return response;
} catch (error:any) {
     return NextResponse.json({error: error.message},{
            status:500
        })
}
 }