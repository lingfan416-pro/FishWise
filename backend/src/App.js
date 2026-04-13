const express = require("express");
const cors = require("cors");
const spotsRouter = require("./routes/spots");
const recommendationRouter = require("./routes/recommendation");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173"
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Origin not allowed by CORS"));
    }
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/spots", spotsRouter);
app.use("/api/recommendation", recommendationRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

app.use((err, req, res, next) => {
  const message = err.message || "Internal server error.";
  res.status(500).json({ error: message });
});

module.exports = app;
