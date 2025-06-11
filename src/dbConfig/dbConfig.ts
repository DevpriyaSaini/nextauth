import mongoose from "mongoose";

//set the bugs for mongo
 export async function connection(){
     try {
       
        mongoose.connect("amongodb+srv://devpriyasaini:Anilsaini70177@cluster01.kzupp.mongodb.net/Cluster01")
        const connect= mongoose.connection
        connect.on('connected',()=>{
            console.log("mongo connected");
            
        })
        connect.on('error',(err)=>{
            console.log("error to connect mongo "+err);
            process.exit()
        })
     } catch (error) {
        console.log(error);
        
     }
}