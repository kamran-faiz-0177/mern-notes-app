const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB connected successfully");
  }).catch((error) => {
    console.error("MongoDB connection error:", error);
  });   

  