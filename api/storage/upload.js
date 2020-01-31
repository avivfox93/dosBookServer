
const multer = require('multer');
var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now());
    }
  });

  const upload = multer({storage:storage}).single('userPhoto');

  module.exports = upload;
