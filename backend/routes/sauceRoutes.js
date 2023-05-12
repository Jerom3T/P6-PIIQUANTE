const express = require("express");
const router = express.Router();
const multer = require('../middleware/multer-config');
const sauceController = require("../controllers/sauceController");
const auth = require("../middleware/auth");

router.post('/', auth,multer, sauceController.createSauce);
router.put('/:id', auth, multer, sauceController.modifySauce);
router.delete("/:id", auth, sauceController.deleteSauce);
router.get("/:id", auth, sauceController.getOneSauce);
router.get("/", auth, sauceController.getAllSauces);
router.post("/:id/like", auth, sauceController.likeSauce);

module.exports = router;
