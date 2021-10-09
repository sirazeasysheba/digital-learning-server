const express = require("express");
const router = express.Router();
const { signup, signin } = require("../../controllers/admin/auth");
const {
  isRequestValidated,
  validateSignup,
  validateSignIn,
} = require("../../vallidators/auth");

router.post("/admin/signin", validateSignIn, isRequestValidated, signin);
router.post("/admin/signup", validateSignup, isRequestValidated, signup);
module.exports = router;
