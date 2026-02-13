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

// Behind Render's proxy, trust the first proxy so that
// req.secure is correctly set and secure cookies work.
app.set("trust proxy", 1);

// CORS
app.use(
  cors({
    origin: true, // allow all origins (safe for hackathon)
    credentials: true,
  })
);

app.use(express.json());

// Session middleware (REQUIRED for OAuth)
app.use(
  session({
    name: "virasat-setu-session",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS on Render
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

/* =====================
   ROUTES
===================== */

// Health check (VERY IMPORTANT for Render)
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Auth & API routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/auth", require("./routes/localAuthRoutes")); // Email/password auth
app.use("/api/places", require("./routes/placeRoutes"));

/* =====================
   PRODUCTION DEPLOYMENT SETUP
===================== */

// In production, serve the React build from client/dist so
// that frontend and backend share the same origin.
if (process.env.NODE_ENV === "production") {
  // FIX 1: Changed "build" to "dist" because you are using Vite
  const clientBuildPath = path.join(__dirname, "..", "client", "dist");

  // Serve static assets
  app.use(express.static(clientBuildPath));

  // For any non-API route, serve index.html from the React build
  // FIX 2: Changed "/*" to "*" to fix the 'Missing parameter' crash
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
} else {
  // Development mode root route
  app.get("/", (req, res) => {
    res.send("API is running in Development mode");
  });
}

/* =====================
   DATABASE + SERVER
===================== */

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:");
    console.error(err.message);
    process.exit(1); // crash on DB failure (important for Render)
  });
