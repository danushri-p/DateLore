const express = require("express");
const cors = require("cors");
require("dotenv").config(); 

const connectDB = require("./database/db"); 

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

// Test route
app.get("/test", (req, res) => {
  res.send("Server is running");
});
