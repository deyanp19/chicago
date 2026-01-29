// // this is the route to upload files

// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const auth = require('../middleware/auth');
// const config = require('config');


// const fs = require('fs');
// const uploadDir = config.get("UPLOAD_DIR") || path.join(__dirname, '../../public/images/uploaded_pic');

// const storage = multer.diskStorage({
//     destination: function(req,file,cb) {
//         cb(null, path.join(__dirname, '../uploads'));
//     },
//     filename: function(req,file,cb){
//         const uniqueSuffix = Date.now() + path.extname(req.file.originalname);
//         cb(null, uniqueSuffix+'-' + file.originalname)
//     }
// });
// if (!fs.existsSync(uploadDir)) {
//     try {
        
//         fs.mkdirSync(uploadDir);
//     } catch (error) {
//         throw new Error(`Couldnt create folder from backend uploads.js ln: 23 ${error}`);
//     }
//  };
// console.log('UPLOAD_DIR value:', config.get('UPLOAD_DIR'));   

//  const fileFilter = async (req, file, cb) => {
//     if (!file) {
//         return cb(new Error('No file provided'));
//     }
//     try {
       
//         const fileTypeModule = await import('file-type');  // Dynamic import for ES module
//         const buffer = await fileTypeModule.fileTypeFromBuffer(file);  // Use the module
//         const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
//         if (buffer && allowedTypes.includes(buffer.mime)) {
//             cb(null, true);
//         } else {
//             cb(new Error('Only image files are allowed!'), false);
//         }
//     } catch (err) {
//         cb(err);
//     }
// };
// const upload = multer({
//      storage:storage,
//      limits: { fileSize: 5 * 1024 * 1024 },
//     fileFilter: fileFilter
// }); //max 5mb
  

//   router.post('/', auth, upload.single('file'), async (req, res, next) => {
//     console.log('deyan ln:50 upload backend:', req.file);  // {{change 1: Add logging for req.file to debug}}
//     if (!req.file) {
//         return res.status(400).json({ message: 'No file uploaded!' });
//     }

//     try {
//         // Save the file to disk manually
//         const filePath = path.join(uploadDir, Date.now() + path.extname(req.file.originalname));
//         console.log('deyan',filePath, req.file.buffer);
        
//         fs.writeFileSync(filePath, req.file.buffer);  // Write the buffer to disk
        
//         res.json({ message: 'File uploaded successfully!', filename: path.basename(filePath) });
//     } catch (err) {
//         next(err);  // Pass errors to global error handler
//             }
//         },
//         (err, req, res, next) => {
//             if (err instanceof multer.MulterError) {
//                 // Handle Multer-specific errors (e.g., file size limit)
//                 return res.status(400).json({ message: `Multer error: ${err.message}` });
//             } else if (err) {
//                 // Handle other errors (e.g., from file filter)
//                 console.log('Error details:', err);  // {{change 2: Add logging for error details}}
//                 if (req.file) {
//                     if (req.file.path) {
//                         fs.unlinkSync(req.file.path);  // Add check to avoid undefined path
//                     }
//                 }
//                 return res.status(400).json({ message: `Upload error: ${err.message}` });
//             }
//             if (process.env.NODE_ENV !== 'production') {
//                 console.log(req.file, req.body);
//             }
//             next();  // Proceed if no error
//     });

// module.exports = router;

//============with diskStorage===============

// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const auth = require('../middleware/auth');
// const config = require('config');
// const fs = require('fs');

// // Standardize on one dir from config (or default); ensure it exists
// const uploadDir = config.get('UPLOAD_DIR') || path.join(__dirname, '../../public/images/uploaded_pic');
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true }); // Recursive for nested dirs
// }
// console.log('UPLOAD_DIR value:', uploadDir);

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, uploadDir); // Use the standardized dir
//     },
//     filename: function (req, file, cb) {
//         const ext = path.extname(file.originalname); // Fixed: Use file, not req.file
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, uniqueSuffix + ext); // Clean filename: timestamp-random.ext (ignore originalname for security)
//     }
// });

// // Simple synchronous MIME filter (client can fake, but sufficient for basic; for true validation, use memoryStorage)
// const fileFilter = (req, file, cb) => {
//     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
//     if (allowedTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(new Error('Only image files are allowed!'), false);
//     }
// };

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
//     fileFilter: fileFilter
// });

// router.post('/', auth, upload.single('file'), (req, res, next) => {
//     console.log('deyan ln:146 upload backend:', req.file.path); // Logging for debug
//     if (!req.file) {
//         return res.status(400).json({ message: 'No file uploaded!' });
//     }
    
//     try {
//         // No manual save needed—Multer already saved to req.file.path
//         res.json({ 
//             message: 'File uploaded successfully!', 
//             filename: req.file.filename,
//             path: req.file.path // Return full path if needed (relative to server)
//         });
//     } catch (err) {
//         next(err); // Pass to error handler
//     }
// }, (err, req, res, next) => {
//     console.log('Error details:', err); // Logging
    
//     if (err instanceof multer.MulterError) {
//         // Multer errors (e.g., size limit)
//         return res.status(400).json({ message: `Multer error: ${err.message}` });
//     } else if (err) {
//         // Other errors (e.g., file filter)
//         if (req.file && req.file.path) {
//             fs.unlinkSync(req.file.path); // Cleanup partial upload
//         }
//         return res.status(400).json({ message: `Upload error: ${err.message}` });
//     }
    
//     // No next() needed here—if no err, response already sent by handler
//     if (process.env.NODE_ENV !== 'production') {
//         console.log(req.file, req.body);
//     }
// });

// module.exports = router;

// with memoryState
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const config = require('config');
const fs = require('fs');
const fileTypeFromBuffer = require('file-type').fileTypeFromBuffer; // Import directly (assuming file-type v16+)

// Standardize on one dir from config (or default); ensure it exists
const uploadDir = config.get('UPLOAD_DIR') || path.join(__dirname, '../../public/images/uploaded_pic');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // Recursive for nested dirs
}
console.log('UPLOAD_DIR value:', uploadDir);

const storage = multer.memoryStorage(); // Switched to memoryStorage — file in req.file.buffer

// Simple synchronous MIME filter first (quick reject based on client info)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type based on MIME!'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: fileFilter
});

router.post('/', auth, upload.single('file'), async (req, res, next) => {
    console.log('deyan ln:50 upload backend:', req.file); // Logging for debug
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded!' });
    }
    
    try {
        // Validate actual content with file-type (since buffer is available now)
        const fileInfo = await fileTypeFromBuffer(req.file.buffer);
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (!fileInfo || !allowedTypes.includes(fileInfo.mime)) {
            throw new Error('Only image files are allowed! (Content validation failed)');
        }

        // Generate filename and save manually
        const ext = path.extname(req.file.originalname) || (fileInfo ? `.${fileInfo.ext}` : '');
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = uniqueSuffix + ext; // Clean filename: timestamp-random.ext
        const filePath = path.join(uploadDir, filename);

        fs.writeFileSync(filePath, req.file.buffer); // Save buffer to disk

        res.json({ 
            message: 'File uploaded successfully!', 
            filename: filename,
            path: filePath // Return full path if needed (relative to server)
        });
    } catch (err) {
        next(err); // Pass to error handler
    }
}, (err, req, res, next) => {
    console.log('Error details:', err); // Logging
    
    if (err instanceof multer.MulterError) {
        // Multer errors (e.g., size limit)
        return res.status(400).json({ message: `Multer error: ${err.message}` });
    } else if (err) {
        // Other errors (e.g., file validation)
        // No cleanup needed — file not saved to disk yet with memoryStorage
        return res.status(400).json({ message: `Upload error: ${err.message}` });
    }
    
    // No next() needed here—if no err, response already sent by handler
    if (process.env.NODE_ENV !== 'production') {
        console.log(req.file, req.body);
    }
});

module.exports = router;