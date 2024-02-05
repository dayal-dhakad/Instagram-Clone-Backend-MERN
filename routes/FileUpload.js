const express = require('express')
const router = express.Router();

const {imageUpload,profileImageUpload, videoUpload} = require("../controllers/fileUpload");

// router.post("/profileimageupload", profileImageUpload);

router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/profileimgupload/:id", profileImageUpload)
module.exports = router;