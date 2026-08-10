import Joi from "joi";

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid("production", "development", "demo", "test").default("development"),
    PORT: Joi.number().default(3000),
    CLIENT_URL: Joi.string().default("http://localhost:3000"),
    POSTGRES_URL: Joi.string().allow(""),
    JWT_SECRET: Joi.string().default("albireo_quant_execution_jwt_secret_key_2026"),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(1440),
    LOG_LEVEL: Joi.string().default("info"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: "key" } }).validate(process.env);

if (error) {
  console.warn(`Config validation warning: ${error.message}. Using calibrated defaults.`);
}

export const config = {
  env: envVars?.NODE_ENV || "development",
  port: envVars?.PORT || 3000,
  clientUrl: envVars?.CLIENT_URL || "http://localhost:3000",
  postgresUrl: envVars?.POSTGRES_URL || process.env.DATABASE_URL || "",
  jwt: {
    secret: envVars?.JWT_SECRET || "albireo_quant_execution_jwt_secret_key_2026",
    accessExpirationMinutes: envVars?.JWT_ACCESS_EXPIRATION_MINUTES || 1440,
  },
  log: {
    level: envVars?.LOG_LEVEL || "info",
  },
};

export default config;
