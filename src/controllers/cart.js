const Cart = require("../models/cart");
exports.addItemToCart = (req, res) => {
  Cart.findOne({ user: req.user._id }).exec((error, cart) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (cart) {
      const course = req.body.cartItems.course;
      const item = cart.cartItems.find((c) => c.course == course);
      if (item) {
        return res.status(400).json({ message: "Course  is already taken" });
      }
    } else {
      const cart = new Cart({
        user: req.user._id,
        cartItems: req.body.cartItems,
      });

      cart.save((error, cart) => {
        if (error) {
          return res.status(400).json({ error });
        }
        if (cart) {
          return res.status(400).json({ cart });
        }
      });
    }
  });
};
