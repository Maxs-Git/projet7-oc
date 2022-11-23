const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const postCtrl = require("../controllers/post");

router.get("/", auth, postCtrl.getAllPost);
router.post("/", auth, multer, postCtrl.createPost);
router.post("/:id/like", auth, postCtrl.likeDislike);
// router.get("/:id", auth, postCtrl.getOnepost);
router.put("/:id", auth, multer, postCtrl.modifyPost);
router.delete("/:id", auth, postCtrl.deletePost);

module.exports = router;

// router.put("/:id", auth, multer, postCtrl.modifySauce);
