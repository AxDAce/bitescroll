const { ImageKit }=require("@imagekit/nodejs")

const imagekit=new ImageKit({
    publicKey: process.env.PUBLIC_KEY,     // Required
    privateKey: process.env.PRIVATE_KEY,   // Must be camelCase
    urlEndpoint: process.env.URL_ENDPOINT
})

async function uploadFile(buffer){
    const result=await imagekit.files.upload({
        file:buffer.toString("base64"),
        fileName:"imagekit.jpg"
    })
    return result;
}

module.exports={uploadFile}