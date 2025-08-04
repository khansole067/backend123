const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 9000;
const path = require("path");


// Serve the uploads folder statically
app.use("/uploads", express.static(path.join(__dirname, "upload")));

// Middleware to parse JSON
app.use(express.json());

// Static folder for image access
app.use("/uploads", express.static("uploads")); //  allow access to uploaded files

// Replace with your actual MongoDB URI
const mongoURL = "mongodb+srv://khansole067:khansole067@cluster0.x0sul0g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster"
// Connect to MongoDB (modern syntax)
mongoose.connect(mongoURL)
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
  });

   //upload image
  const uploadRoute = require("./routes/upload"); //  import upload route
   app.use("/api", uploadRoute); //  mount it on /api/upload

// Sample route
app.get('/', (req, res) => {
  res.send('Hello from Express and MongoDB!');
});
const userRoutes =require("./routes/userRoutes");
app.use("/api",userRoutes);

const authRoute = require("./routes/auth");
app.use("/api", authRoute);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});