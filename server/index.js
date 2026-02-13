const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
require("dotenv").config();

require("./config/passport"); // passport strategies

const app = express();

/* =====================
   MIDDLEWARE
===================== */

app.set("trust proxy", 1);

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    name: "virasat-setu-session",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

/* =====================
   ROUTES
===================== */

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.use("/auth", require("./routes/authRoutes"));
app.use("/auth", require("./routes/localAuthRoutes"));
app.use("/api/places", require("./routes/placeRoutes"));

/* =====================
   PRODUCTION DEPLOYMENT SETUP
===================== */

if (process.env.NODE_ENV === "production") {
  // 1. Point to "build" (Confirmed by your logs: "react-scripts build")
  const clientBuildPath = path.join(__dirname, "..", "client", "build");

  app.use(express.static(clientBuildPath));

  // 2. CRITICAL FIX: Use Regex /.*/ instead of "*" or "/*"
  // This bypasses the "Missing parameter name" error completely.
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running in Development mode");
  });
}

/* =====================
   DATABASE + SERVER
===================== */

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    autoIndex: false, // Disable auto index creation during connection
  })
  .then(async () => {
    console.log("✅ MongoDB connected");
    
    // Drop the problematic old googleId_1 index (sparse: true)
    try {
      const User = mongoose.connection.collection("users");
      await User.dropIndex("googleId_1");
      console.log("✅ Dropped old googleId_1 index");
    } catch (err) {
      console.log("⚠️  googleId_1 index doesn't exist or already dropped");
    }

    // Now create indexes with new schema (will create googleId_partial_unique)
    const UserModel = require("./models/User");
    await UserModel.createIndexes();
    console.log("✅ Indexes synced with new schema");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
