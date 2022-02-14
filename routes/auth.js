const { Router } = require("express");
const { Signup } = require("../controllers/auth")
const router = Router();

router.route("/signup").post(Signup);
module.exports = router;