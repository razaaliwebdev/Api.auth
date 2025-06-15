import multer from 'multer';
import path from 'path';


// Set Storage Engine
const storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, "uploads");
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + path.extname(file.originalname));
        },
    }
);

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"), false);
    };
};

const upload = multer(
    {
        storage, fileFilter
    }
);

export default upload;