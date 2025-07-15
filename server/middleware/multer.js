import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('📁 Destination Info:', {
      file: file.originalname,
      mimetype: file.mimetype
    });
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    console.log('📝 File Info:', {
      fieldname: file.fieldname,
      originalname: file.originalname,
      encoding: file.encoding,
      mimetype: file.mimetype
    });
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log('🔍 FileFilter Check:', {
      fieldname: file.fieldname,
      mimetype: file.mimetype
    });
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

export default upload;