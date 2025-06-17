import { connection } from "@/dbConfig/dbConfig";
import user from "@/models/usermodel"
import { NextRequest,NextResponse } from "next/server";


connection();
export async function POST(request:NextRequest) {
    try {

        const reqbody=await request.json();
        const {token}=reqbody;
        console.log("token from verification",token);

       const users= await user.findOne({verifyToken:token,
            verifyTokenExpiry:{ $gt: Date.now() } 
        })
        console.log(user);
        
          console.log("Found user:", users);
        if(!users){
            return NextResponse.json({error:"Invalid token"},{status:400})
        }
        
       users.isverified = true;
      users.verifyToken= undefined;
      users.verifyTokenExpiry = undefined;
        await users.save();

        return NextResponse.json({
            msg:"Email verified sucessfully",
            success:true,

        },{status:200})
        
        
    } catch (error:any) {
        console.log("error in verification",error);
        
        return NextResponse.json({error: error.message},{
            status:500
        })
    }
}