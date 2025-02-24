import multer from 'multer';
import path from 'path';
import fs from 'fs'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

  // Ensure the 'uploads' folder exists
  const uploadFolder = path.join(__dirname,'..', 'uploads');
  if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
    console.log('Uploads folder created');
  }


// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname,'..', 'uploads');
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Exporting the upload object
export const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 } // 10 MB in bytes
});