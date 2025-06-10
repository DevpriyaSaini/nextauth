import { verify } from "crypto";
import mongoose from "mongoose";
const userschema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please provide a username"]
    },
    email:{
        type:String,
        required:[true,"Please provide a email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please provide a password"]
    },
    isverified:{
        type:Boolean,
        default:false,
    },
    isadmin:{
        type:Boolean,
        default:false,
    },
    forgotpasswordToken:String,
    forgotpasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date,
})

const user=mongoose.models.users||mongoose.model("user",userschema)
export default user;