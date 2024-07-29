const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const connectDB = require("./db/connection");
const todoRoutes = require("./routes/todo");
const dotenv = require("dotenv");

const app = express();
app.use(bodyParser.json());

dotenv.config();

connectDB();

app.use(express.json());
app.use("/", todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
