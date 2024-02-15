const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

exports.upload = multer({ storage: storage });

exports.isValidFilename = function(filename) {
    
    const validFilenameRegex = /^[a-zA-Z0-9_.-]+$/;
    return validFilenameRegex.test(filename);
}
