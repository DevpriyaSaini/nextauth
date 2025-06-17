import { connection } from "@/dbConfig/dbConfig";
import user from "@/models/usermodel"
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendmail } from "@/helpers/mailer";

 connection();

 export async function POST(request:NextRequest) {
    try {
        const reqbody= await request.json();
        const{username,email,password}=reqbody;
        //validation
        console.log(reqbody);
        const existuser= await user.findOne({email})
        if(existuser){
            return NextResponse.json({error:"user already exist"},{status:400})
        }
        const salt = await bcrypt.genSalt(10);
        const hasedpassword=await bcrypt.hash(password,salt)
           const newuser= new user({
            username,
            email,
            password:hasedpassword
           })
           const saveuser=await newuser.save();
           console.log(saveuser);
           
           //send verification
        await sendmail({email,emailType:"VERIFY",userId:saveuser._id})
        return NextResponse.json({
            msg:"user register sucessfully",
            sucess:true,
            saveuser
        })
        
    } catch (error:any) {
        return NextResponse.json({error:error.message})
    }
 }