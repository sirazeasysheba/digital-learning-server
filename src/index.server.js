const express = require("express");
const app = express();
const env = require("dotenv");
const mongoose = require("mongoose");
//Routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");
const courseRoutes = require("./routes/courses");
const cartRoutes = require("./routes/cart");
//Config
env.config();
app.use(express.json());

//Database connection
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fbp7l.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  });

//Connections
app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", courseRoutes);
app.use("/api", cartRoutes);
//App listening
app.listen(process.env.PORT, () => {
  console.log("Server running");
});
