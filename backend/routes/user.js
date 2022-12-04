const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/User");
const auth = require("../middleware/auth");

router.post("/signup", userCtrl.signup);
router.get("/me", auth, userCtrl.myUser);
router.post("/login", userCtrl.login);
// router.get("/logout", userCtrl.logout);

module.exports = router;
