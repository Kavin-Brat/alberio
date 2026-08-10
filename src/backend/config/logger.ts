import winston from "winston";
import { config } from "./config";

const { combine, timestamp, printf, colorize } = winston.format;

const logFormat = printf((detail) => {
  if (config.env === "development") {
    return `[${detail.timestamp}] ${detail.level.toUpperCase()} [${detail.component || "App"}]: ${detail.message} ${
      detail.stack ? `\nStack: ${detail.stack}` : ""
    }`;
  }
  return JSON.stringify({
    timestamp: detail.timestamp,
    logLevel: detail.level.toUpperCase(),
    userId: detail.userId || "N/A",
    component: detail.component || "General",
    message: detail.message || "",
    url: detail.url || "",
    statusCode: detail.statusCode || undefined,
    stack: detail.stack || "",
  });
});

export const logger = winston.createLogger({
  level: config.log.level || "info",
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
  transports: [
    new winston.transports.Console({
      level: config.env === "development" ? "debug" : "info",
    }),
  ],
});

export default logger;
