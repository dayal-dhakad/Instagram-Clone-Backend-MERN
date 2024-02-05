const express = require("express");
const app = express();
const cors = require("cors");

// Enable CORS for all origins
app.use(cors());

//load config from env
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middleware to parse json request body
app.use(express.json());

//import routes
const user = require("./routes/user");
app.use("/api/v1", user);

//connect to the database
const dbConnect = require("./config/database");
dbConnect();

//start server

app.listen(PORT, () => {
  console.log("Server started at ", PORT);
});

//default route
app.get("/", (req, res) => {
  res.send("<h1>This is HOME PAGE</h1>");
});
