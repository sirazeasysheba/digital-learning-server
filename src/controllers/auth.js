const User = require("../models/auth");
const jwt = require("jsonwebtoken");
exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user) {
      return res.status(400).json({ message: "User already exits" });
    }
    const { name, username, email, contactNumber, password } = req.body;
    const _user = new User({ name, username, email, contactNumber, password });
    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({ message: "Something went wrong" });
      } else {
        return res.status(201).json({ message: "User created successfully" });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN, {
          expiresIn: "1h",
        });
        const { _id, name, username, email, role, contactNumber } = user;
        res.status(201).json({
          token,
          user: {
            _id,
            name,
            username,
            email,
            contactNumber,
            role,
          },
        });
      } else {
        return res.status(400).json({ message: "Invalid password" });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong!!!" });
    }
  });
};

exports.requireSignIn = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(token, process.env.JWT_TOKEN);
  req.user = user;
  console.log(user);
  next();
};