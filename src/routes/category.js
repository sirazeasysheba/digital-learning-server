const express = require("express");
const { requireSignIn, adminMiddleware } = require("../common-middleware");
const { addCategory, getCategories } = require("../controllers/category");
const router = express.Router();
router.post("/category/create", requireSignIn, adminMiddleware, addCategory);
router.get("/category/categories", getCategories);
module.exports = router;
