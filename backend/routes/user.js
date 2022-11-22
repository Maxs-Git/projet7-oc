const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/User");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/:id", userCtrl.myUser);
// router.get("/logout", userCtrl.logout);

module.exports = router;
