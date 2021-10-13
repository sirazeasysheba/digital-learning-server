const slugify = require("slugify");
const Course = require("../models/courses");

exports.createCourse = (req, res) => {
  const {
    name,
    description,
    category,
    price,
    duration,
    overview,
    curriculum,
    objective,
    lectures,
  } = req.body;

  let pictures = [];
  if (req.files.length > 0) {
    pictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const course = new Course({
    name: name,
    slug: slugify(name),
    description,
    category,
    price,
    duration,
    overview,
    curriculum,
    objective,
    lectures,
    createdBy: req.user._id,
    pictures,
  });
  course.save((error, course) => {
    if (error) {
      res.status(400).json({ error });
    }
    if (course) {
      res.status(400).json({ course });
    }
  });
};

exports.getCourse = (req, res) => {
  Course.find({}).exec((error, course) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (course) {
      return res.status(201).json({ course });
    }
  });
};
