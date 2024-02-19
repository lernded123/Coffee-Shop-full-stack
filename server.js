const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");
const userRoute = require("./routes/user");
const authRoute = require("./routes/user");
const productRoute = require("./routes/product");

require("dotenv").config({
  path: path.resolve(__dirname, "config", ".env"),
});

const app = express();

const port = process.env.PORT || 3900;

//Connect to MongoDB
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.jfyn68e.mongodb.net/${process.env.MONGODB_DATABASE_NAME}?retryWrites=true&w=majority`
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//enable CORS
app.use(cors());

//enable Body parser
app.use(express.urlencoded({ extended: false }));

//Serve static files
app.use(express.static("public"));

//Set EJS as templating engine
app.set("view engine", "ejs");

//LOGIC GOES HERE
app.get("/", function (req, res) {
  res.render("index");
});

app.get("/", (req, res) => {
  const query = `SELECT * FROM product LIMIT 3`;

  //Execute Query
  connection.query(query, (error, result) => {
    if (!request.session.cart) {
      request.session.cart = [];
    }

    response.render("product, { product : result , }");
  });
});

app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

app.listen(port, () => {
  console.log(`Server running on port: http://localhost:${port} `);
});
