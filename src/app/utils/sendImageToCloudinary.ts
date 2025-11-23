import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';
import fs from 'fs';

cloudinary.config({
  cloud_name: config.cloudinary_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

export const sendImageToCloudinary = (imageName: string, path: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imageName, folder: 'uploads' },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
        fs.unlink(path, (err) => {
          if (err) console.log(err);
        });
      }
    );
  });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, process.cwd() + '/uploads/'),
  filename: (req, file, cb) => cb(null, file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1e9))
});

export const upload = multer({ storage });
