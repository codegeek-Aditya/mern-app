import { v2 as cloudinary } from "cloudinary";
// fs - file system - node js default - read, write, remove - used for managing file system
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadOnCLoudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        // uplaod the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfully
        console.log(`File upload successfully on Cloudinary`, response.url)
        return response;

    } catch (error) {
        // this should happen then only we will move forward
        fs.unlinkSync(localFilePath) // - remove the locally saved temporary file as the upload operation failed.
        return null;
    }
}

export { uploadOnCLoudinary };