// this is the route to upload files

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const config = require('config');



//====start multer file upload integration==========================
 // Create a directory for uploads if it doesn't exist
 const fs = require('fs');
 const uploadDir = config.get("UPLOAD_DIR") || path.join(__dirname, '../../public/images/uploaded_pic');
 
 if (!fs.existsSync(uploadDir)) {
     fs.mkdirSync(uploadDir);
 };
  const fileFilter = async (req, file, cb) => {
    try {
        const fileTypeModule = await import('file-type');  // Dynamic import for ES module
        const buffer = await fileTypeModule.fileTypeFromBuffer(file.buffer);  // Use the module
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (buffer && allowedTypes.includes(buffer.mime)) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    } catch (err) {
        cb(err);
    }
};
 
  
  // Initialize multer with storage and file filter

  //===============end multer integration==============================


router.post('/', auth,upload.single('file'), async (req,res, next) => {
    if (!req.file) {
        return res.status(400).json({message: 'No file uploaded!...'});
    }
    try {
       // Save the file to disk manually
       const filePath = path.join(uploadDir, Date.now() + path.extname(req.file.originalname));
       fs.writeFileSync(filePath, req.file.buffer);  // Write the buffer to disk
       
       res.json({ message: 'File uploaded successfully!', filename: path.basename(filePath) });
    } catch (err) {
        next(err);  // Pass errors to global error handler
    }
  
},  (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Handle Multer-specific errors (e.g., file size limit)
        return res.status(400).json({ message: `Multer error: ${err.message}` });
    } else if (err) {
        // Handle other errors (e.g., from file filter)
        if (err) {
            if (req.file) {
                if (req.file.path) {
                    fs.unlinkSync(req.file.path);  // {{change 1: Add check to avoid undefined path}}
                }
            }
            return res.status(400).json({ message: `Upload error: ${err.message}` });
        }
        return res.status(400).json({ message: `Upload error: ${err.message}` });
    }
    if (process.env.NODE_ENV !== 'production') {
        console.log(req.file, req.body);
    }
    next();  // Proceed if no error
});







module.exports = router;