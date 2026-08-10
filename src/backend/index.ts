import app from "./app";
import { LoggerInfo, LoggerError } from "./utils/helpers";
import { initPostgresSchema } from "@/lib/db/postgres";

/**
 * Backend Server Entry Point & Process Exception Boundary
 * Single Responsibility: Initializes database connections and binds global process-level
 * uncaughtException and unhandledRejection exception handlers.
 */
let isInitialized = false;

export async function initializeBackendServer() {
  if (isInitialized) return app;

  try {
    LoggerInfo(null, "Initializing Albireo Backend Server Runtime...", "Bootstrap");

    // Initialize PostgreSQL Database Connection Pool & Auto-DDL Schema
    await initPostgresSchema();

    isInitialized = true;
    LoggerInfo(null, "Albireo Backend Server successfully initialized.", "Bootstrap");
  } catch (err: any) {
    LoggerError(null, `Backend initialization failed: ${err.message}`, "Bootstrap");
  }

  return app;
}

// Bind Global Process Exception Handlers
if (typeof process !== "undefined") {
  process.on("uncaughtException", (error: Error) => {
    LoggerError(null, `Uncaught Exception: ${error.message}`, "ProcessException");
  });

  process.on("unhandledRejection", (reason: any) => {
    LoggerError(null, `Unhandled Promise Rejection: ${reason?.message || reason}`, "ProcessException");
  });

  process.on("SIGTERM", () => {
    LoggerInfo(null, "SIGTERM signal received. Shutting down backend graceful server runtime.", "ProcessShutdown");
  });
}

export default app;
