const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const mongoose=require('mongoose');

async function connectDb(){
    try{
        await mongoose.connect(process.env.MONGOOSE_URI)
        console.log("db connected")
    }
    catch(e){
        console.error(e);
    }
}

module.exports=connectDb