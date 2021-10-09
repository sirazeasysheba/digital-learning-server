const express = require("express");
const router = express.Router();
const { signup, signin, n } = require("../controllers/auth");
const { validateSignup, isRequestValidated } = require("../vallidators/auth");
router.post("/signin", validateSignup, isRequestValidated, signin);
router.post("/signup", validateSignup, isRequestValidated, signup);
module.exports = router;
