const multer = require('multer');
const path = require('path');

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/resumes/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    req.isFileValid = false;
    cb(null, false, new Error('Invalid file type, only PDF is allowed!'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
}).single('resume');
