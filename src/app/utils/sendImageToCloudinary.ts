import { v2 as cloudinary } from 'cloudinary'
import config from '../config';

export const sendImageToCloudinary = () => {

  cloudinary.config({
    // cloud_name: config.cloud_name,
    cloud_name: config.cloudinary_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret
  });

  cloudinary.uploader.upload(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr0eOmW6LTrItGZSTWZ6tGwZiJC7PHPDClMg&s",
    {
      public_id: "olympic_flag",
      folder: "uploads"
    },
    (error, result) => {
      if (error) {
        console.log("Upload Error:", error);
      } else {
        console.log("Upload Success:", result);
      }
    }
  );
}
