import user from "@/models/usermodel";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer"
import { env } from "process";

export const sendmail=async({email,emailType,userId}:any)=>{
    try {
         const hasedtoken=await bcrypt.hash(userId.toString(),10);
       if(emailType=='VERIFY'){
       await user.findByIdAndUpdate(userId,{
       $set:{ verifyToken:hasedtoken,
        verifyTokenExpiry:new Date(Date.now()+360000)}
       })
       }
       else if(emailType=='RESET'){
         await user.findByIdAndUpdate(userId,{
          $set:{
        forgotpasswordToken:hasedtoken,
        forgotpasswordTokenExpiry:new Date(Date.now()+360000)
          }
       })
       }

       const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,  
    pass: process.env.GMAIL_APP_PASS  
  }
});
const mailoption={
    from: 'devpriyasaini6@gamil.com',
    to: email,
    subject: emailType=='VERIFY'?"Verify your email":"Reset your password",
    html: `<p>Click<a href="${process.env.DOMAIN}/verifyemail?token=${hasedtoken}">here</a>
to ${emailType==="VERIFY"? "verify your email":
"reset your password"}
or copy and paste the link below in your browser.
<br/>
      "${process.env.DOMAIN}/verifyemail?token=${hasedtoken}
</p>`

}
 const mailresponse=await transporter.sendMail(mailoption)
return mailresponse
        
    } catch (error:any) {
        throw new Error(error.message)
    }
}


