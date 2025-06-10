import user from "@/models/usermodel";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer"
import { env } from "process";

export const sendmail=async({email,emailType,userId}:any)=>{
    try {
         const hasedtoken=await bcrypt.hash(userId.toString(),10);
       if(emailType=='VERIFY'){
       await user.findByIdAndUpdate(userId,{
        verifyToken:hasedtoken,
        verifyTokenExpiry:Date.now()+36000
       })
       }
       else if(emailType=='RESET'){
         await user.findByIdAndUpdate(userId,{
        forgotpasswordToken:hasedtoken,
        forgotpasswordTokenExpiry:Date.now()+36000
       })
       }
 







        var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "77b63fa2aeeff4",
    pass: "****953b"
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
 const mailresponse=await transport.sendMail(mailoption)
return mailresponse
        
    } catch (error:any) {
        throw new Error(error.message)
    }
}


