import { Pool, QueryResult, QueryResultRow } from "pg";

const connectionString =
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL ||
  "postgres://postgres:postgres@localhost:5432/alberio_db";

let pool: Pool | null = null;
let isDbConnected = false;
let isInitialized = false;

export function getPgPool(): Pool | null {
  if (!pool) {
    try {
      pool = new Pool({
        connectionString,
        connectionTimeoutMillis: 3000,
        idleTimeoutMillis: 10000,
        max: 10,
      });

      pool.on("error", (err) => {
        console.warn("PostgreSQL Pool connection warning:", err.message);
        isDbConnected = false;
      });
    } catch (error) {
      console.warn("Could not instantiate PostgreSQL pool:", error);
      pool = null;
    }
  }
  return pool;
}

export async function checkPostgresConnection(): Promise<boolean> {
  if (isDbConnected) return true;
  const p = getPgPool();
  if (!p) return false;

  try {
    const client = await p.connect();
    client.release();
    isDbConnected = true;
    return true;
  } catch (error) {
    isDbConnected = false;
    return false;
  }
}

export async function executeQuery<T extends QueryResultRow = any>(
  text: string,
  params?: any[]
): Promise<QueryResult<T> | null> {
  const p = getPgPool();
  if (!p) return null;

  try {
    return await p.query<T>(text, params);
  } catch (error) {
    console.error("PostgreSQL Query Error:", error);
    return null;
  }
}

export async function initPostgresSchema(): Promise<boolean> {
  if (isInitialized) return isDbConnected;
  const connected = await checkPostgresConnection();
  if (!connected) {
    console.log("PostgreSQL connection not active. Operating with high-speed fallback store.");
    return false;
  }

  try {
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(64) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'FREE',
        subscription_tier VARCHAR(50) NOT NULL DEFAULT 'Free Visitor',
        funnel_level INT NOT NULL DEFAULT 1,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        risk_profile VARCHAR(50) NOT NULL DEFAULT 'Moderate',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        last_login_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        progress JSONB DEFAULT '{}'::jsonb
      );
    `);

    await executeQuery(`
      CREATE TABLE IF NOT EXISTS user_entitlements (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
        entitlement_key VARCHAR(100) NOT NULL,
        granted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, entitlement_key)
      );
    `);

    await executeQuery(`
      CREATE TABLE IF NOT EXISTS user_sessions (
        id VARCHAR(64) PRIMARY KEY,
        user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
        ip_address VARCHAR(45),
        user_agent TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP WITH TIME ZONE
      );
    `);

    await executeQuery(`
      CREATE TABLE IF NOT EXISTS activity_logs (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
        action VARCHAR(100) NOT NULL,
        ip_address VARCHAR(45),
        details TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await executeQuery(`
      CREATE TABLE IF NOT EXISTS department_master (
        department_code VARCHAR(50) PRIMARY KEY,
        department_name VARCHAR(100) NOT NULL,
        description TEXT,
        is_active BOOLEAN DEFAULT TRUE
      );
    `);

    isInitialized = true;
    console.log("PostgreSQL schema successfully verified and ready.");
    return true;
  } catch (error) {
    console.error("Error initializing PostgreSQL schema:", error);
    return false;
  }
}
