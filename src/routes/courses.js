const express = require("express");
const { requireSignIn, adminMiddleware } = require("../common-middleware");
const { createCourse, getCourse } = require("../controllers/courses");
const router = express.Router();
const multer = require("multer");

const shortid = require("shortid");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage });
router.post(
  "/courses/create",
  requireSignIn,
  adminMiddleware,
  upload.array("pictures"),
  createCourse
);

//
router.get("/courses/getcourses", getCourse);
module.exports = router;
