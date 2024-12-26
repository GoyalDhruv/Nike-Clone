import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import path from "path";

function uploadMiddleware() {
    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: (req, file) => {
            const fileExtension = path.extname(file.originalname).substring(1);
            const publicId = `${file.fieldname}-${Date.now()}`;

            return {
                folder: 'uploads',
                public_id: publicId,
                format: fileExtension,
            };
        },
    });

    return multer({
        storage: storage,
        limits: {
            fileSize: 10 * 1024 * 1024,
        },
    });
}

export default uploadMiddleware;