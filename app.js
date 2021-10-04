const express = require("express");
require("dotenv/config");
require("./db");
require("./models/index")

const { isAuthenticated } = require("./middleware/jwt.middleware"); // <== IMPORT

const app = express();
require("./config")(app);


// 👇 MIDDLEWARE MISSING
const allRoutes = require("./routes");
app.use("/api", allRoutes); 

const authRouter = require("./routes/auth.routes");
app.use("/", authRouter);

const cloudRoutes = require("./routes/cloudinary-routes");
app.use("/", cloudRoutes);

const userRouter = require("./routes/user-routes");
app.use("/", userRouter);


const productRouter = require("./routes/product-routes");
app.use("/", productRouter);

const reviewRouter = require("./routes/review-routes");
app.use("/", reviewRouter);



/* app.use((req, res, next) => {
    // If no routes match, send them the React HTML.
    res.sendFile(__dirname + "/public/index.html");
  }); */

// require("./error-handling")(app);

module.exports = app;
