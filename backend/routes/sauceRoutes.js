const express = require("express");
const router = express.Router();
const multer = require('multer');
const sauceController = require("../controllers/sauceController");
const auth = require("../middleware/auth");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + "_" + Date.now() + "." + extension);
  },
});

const upload = multer({ storage: storage });

router.post('/', auth, upload.single('image'), sauceController.createSauce);
router.put('/:id', auth, upload.single('image'), sauceController.modifySauce);
router.delete("/:id", auth, sauceController.deleteSauce);
router.get("/:id", auth, sauceController.getOneSauce);
router.get("/", auth, sauceController.getAllSauces);
router.post("/:id/like", auth, sauceController.likeSauce);

module.exports = router;
