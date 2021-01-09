const multer = require("multer");

exports.uploadImage = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, "./uploads");
    },
    filename(req, file, callback) {
      callback(null, `${file.originalname}`);
    },
  }),

  fileFilter: (req, file, callback) => {
    if (
      !file.originalname.match(/\.(png)$/) &&
      !file.originalname.match(/\.(jpg)$/)
    ) {
      return callback(null, false);
    }

    callback(null, true);
  },
});
