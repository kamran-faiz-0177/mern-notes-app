const router = require("express").Router();
const { SignUp, SignIn } = require("../Controllers/UserController");

router.post("/signup", SignUp);
router.post("/signin", SignIn);

module.exports = router;