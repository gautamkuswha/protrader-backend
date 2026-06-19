const dns = require("node:dns");

dns.setServers([
  "8.8.8.8",
  "8.8.4.4",
]);
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const tradeRoutes = require("./routes/tradeRoutes");

console.log("Running server file:", __filename);
console.log("Trade routes object loaded:", typeof tradeRoutes);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/route-test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Correct server.js is running",
    file: __filename,
  });
});

app.use("/api/trades", tradeRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ProTrade Backend Running",
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    server: "running",
    database: "connected",
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:");
    console.error(error.message);
    process.exit(1);
  }
};

startServer();