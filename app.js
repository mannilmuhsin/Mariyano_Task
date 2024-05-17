require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const teamRoutes = require("./routes/teamRoutes");
const app = express();
app.use(express.json());

// Database Details
const DB_USER = process.env['DB_USER'];
const DB_PWD = process.env['DB_PWD'];
const DB_URL = process.env['DB_URL'];
const DB_NAME = "task-jeff";


// MongoDB connection
mongoose
  .connect("mongodb+srv://"+DB_USER+":"+DB_PWD+"@"+DB_URL+"/"+DB_NAME+"?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api", teamRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
