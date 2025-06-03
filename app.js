require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const expressWinston = require("express-winston");
const winston = require("winston");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());
app.disable('etag');
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message, meta }) => {
        return `${timestamp} ${level}: ${message}\n${JSON.stringify(
          meta,
          null,
          2
        )}\n`;
      })
    ),
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
    requestWhitelist: [
      "ip",
      "headers",
      "method",
      "originalUrl",
      "body",
      "query",
      "params",
    ],
    responseWhitelist: ["body"],
  })
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api", userRoutes);
app.use(
  expressWinston.errorLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
  })
);

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
