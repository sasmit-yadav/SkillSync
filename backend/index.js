// backend/index.js
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();
require("./auth/passport"); // Load passport config

const app = express();

// CORS (allow credentials for cookies)
app.use(cors({
  origin: "http://localhost:5175", // your Vite frontend port
  credentials: true,
}));

// JSON parsing
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || "skillSyncSecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // set true if using HTTPS in prod
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  },
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes); // Google login route
app.use("/api/auth", authRoutes); // Optional if you use same auth logic for API too

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
