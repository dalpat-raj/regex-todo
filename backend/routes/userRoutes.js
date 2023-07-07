const express = require("express");
const { signUp, login, logout } = require("../controller/userController");
const auth = require("../middleware/auth");
const router = express.Router();


router.post("/signup", signUp)
router.post("/login", login)
router.route("/logout").get(logout)


module.exports = router;