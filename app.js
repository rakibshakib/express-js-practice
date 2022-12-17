const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs"); //setting view engine in backend server..
// app.set("views", "template") - if custom template need

// avoid error
mongoose.set("strictQuery", true);

// middle ware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// route
app.get("/", async (req, res) => {
  res.render("home");
});
app.get("/create", async (req, res) => {
  res.render("form");
});
app.post("/", async (req, res) => {
  res.render("home");
});
// connecting to database
mongoose
  .connect("mongodb://localhost:27017/rakib-db", { useNewUrlParser: true })
  .then(() => {
    // console.log("database connecting");
    app.listen(8080, () => {
      console.log("application is ready to serve on port 8080....");
    });
  })
  .catch((err) => {
    console.log("error message from database", err);
  });
