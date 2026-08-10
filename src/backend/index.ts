import app from "./app";
import config from "./config/config";
import logger from "./config/logger";
import { initPostgresSchema } from "../lib/db/postgres";

let isStarted = false;

export async function bootstrapBackendServer(): Promise<void> {
  if (isStarted) return;
  isStarted = true;

  logger.info(`Initializing Albireo Backend Engine in [${config.env.toUpperCase()}] mode...`);

  // Bind Process Exception Safety Handlers (Inspired by devportal_backend_2.0/src/index.js)
  process.on("uncaughtException", (error: Error) => {
    logger.error({
      message: `Uncaught Exception: ${error.message}`,
      component: "ProcessHandler",
      stack: error.stack,
    });
  });

  process.on("unhandledRejection", (reason: any) => {
    logger.error({
      message: `Unhandled Rejection: ${reason?.message || reason}`,
      component: "ProcessHandler",
      stack: reason?.stack || "",
    });
  });

  process.on("SIGTERM", () => {
    logger.info("SIGTERM signal received. Gracefully terminating backend worker pools...");
  });

  // Initialize PostgreSQL Connection Pool & Schema DDL
  try {
    const isDbReady = await initPostgresSchema();
    if (isDbReady) {
      logger.info("PostgreSQL Database Connection Pool initialized & verified successfully.");
    } else {
      logger.warn("PostgreSQL connection offline. Serving queries via fallback store.");
    }
  } catch (error: any) {
    logger.error(`Database pool initialization error: ${error.message}`);
  }
}

// Auto-run bootstrap on server startup
bootstrapBackendServer();

export { app, config, logger };
export default app;
