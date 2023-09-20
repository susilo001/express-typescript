import type { Config } from "drizzle-kit";
const dotenv = require("dotenv");

dotenv.config();
const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
} = process.env;

const POSTGRES_URL = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;

export default {
  schema: "./schema/*.ts",
  out: "../drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: POSTGRES_URL as string,
  },
} satisfies Config;
