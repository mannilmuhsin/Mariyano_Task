const express = require("express");
const mongoose = require("mongoose");
const teamRoutes = require("./routes/teamRoutes");

const app = express();
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api", teamRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
