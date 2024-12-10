import multer from 'multer';
import path from 'path';

// Define storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/'); // Destination folder for uploads
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

// File filter to accept only image files
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true); // Accept file
    } else {
        cb(new Error('Only image files are allowed'), false); // Reject file
    }
};

// Create the Multer instance
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});

export default upload;
