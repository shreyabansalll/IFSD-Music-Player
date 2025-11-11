const { MongoClient, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Replace with your MongoDB connection string
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
const port = 8080;

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("✅ Connected successfully to MongoDB");

    app.listen(port, () => {
      console.log("✅ Server started at port: " + port);
    });
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
  }
}

connectToMongoDB();

const myDb = client.db("musicplayer");

// ----------------------------
// Fetch all songs
// ----------------------------
app.get("/api/songs", async (req, res) => {
  try {
    const data = await myDb.collection("songs").find({});
    const songsArr = await data.toArray();
    res.send(songsArr);
  } catch (err) {
    res.status(500).json({ error_msg: "Error fetching songs" });
  }
});

// ----------------------------
// User Signup
// ----------------------------
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await myDb.collection("users").findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ error_msg: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name,
      email,
      password: hashPassword,
    };

    await myDb.collection("users").insertOne(newUser);
    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error_msg: "Error creating user" });
  }
});

// ----------------------------
// User Login
// ----------------------------
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await myDb.collection("users").findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error_msg: "User not found" });
    }

    const isCorrect = await bcrypt.compare(password, user.password);

    if (isCorrect) {
      const payload = { userId: user._id };
      const token = jwt.sign(payload, "my_secret_token", { expiresIn: "1h" });
      return res.status(200).json({ jwt_token: token, user: { name: user.name, email: user.email } });
    } else {
      return res.status(401).json({ error_msg: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error_msg: "Login error" });
  }
});

// ----------------------------
// Update user details
// ----------------------------
app.put("/api/user/update/:id", async (req, res) => {
  try {
    const { name, age, status } = req.body;
    const id = req.params.id;

    const result = await myDb
      .collection("users")
      .updateOne({ _id: new ObjectId(id) }, { $set: { name: name, age: age, status: status } });

    res.send(result);
  } catch (error) {
    res.status(500).json({ error_msg: "Error updating user" });
  }
});

// ----------------------------
// Root route
// ----------------------------
app.get("/", (req, res) => {
  res.send("✅ IFSD Music Player Backend is Running");
});
