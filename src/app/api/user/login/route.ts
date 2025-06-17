import { connection } from "@/dbConfig/dbConfig";
import user from "@/models/usermodel"
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendmail } from "@/helpers/mailer";
import jwt from "jsonwebtoken";
const tokenSecret = process.env.TOKEN_SECRET;

 connection();

 export async function POST(request:NextRequest) {
    try {
        const reqbody=await request.json();
        const{email,password}=reqbody;
        //validation
        console.log(reqbody);
        const users=await user.findOne({email});
        if(!users){
             return NextResponse.json({msg:"No user found"},{
            status:400
        })
        }
        const validpass=await bcrypt.compare(password,users.password)
       if(!validpass){
        return NextResponse.json({msg:"Password incorrect"},{
            status:400
        })
       }
         const tokenData={
            id:users._id,
            username:users.username,
            email:users.email
         }


        const token=await jwt.sign(tokenData,tokenSecret!,{expiresIn:'1d'})

        const response=NextResponse.json({
            msg:"user Logged In success",
            success:true
        })
        
        response.cookies.set("token",token,{
            httpOnly:true
        })
        return response;
    } catch (error:any) {
         return NextResponse.json({error:error.message},{
            status:500
        })
    }
 }