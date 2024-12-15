import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';

// Define the destination for storing files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this directory exists or is created
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Create a unique file name
  },
});

// File filter to validate file types
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
    cb(new Error('File type is not supported')); // Correct usage of FileFilterCallback
  } else {
    cb(null, true); // No error, file type is supported
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB file size limit
  },
});

export default upload;
