import multer from "multer";

//Defines the folder destination and the filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/src/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

//Defines the accepted format
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("jpeg") ||
    file.mimetype.includes("png") ||
    file.mimetype.includes("jpg")
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage: storage, fileFilter: fileFilter });

export const saveImage = upload.single("image");
