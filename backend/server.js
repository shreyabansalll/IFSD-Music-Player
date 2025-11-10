const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
app.use(cors());  // ✅ allows connection from frontend (5179)
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("✅ Backend is running properly");
});

// routes
const songRoutes = require("./routes/songRoutes");
app.use("/api/songs", songRoutes);
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

const PORT = process.env.PORT || 8080;
app.listen(PORT, "localhost", () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
