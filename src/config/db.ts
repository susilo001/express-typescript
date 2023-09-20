import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
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

// for query purposes
const queryClient = postgres(POSTGRES_URL as string);
export const db: PostgresJsDatabase = drizzle(queryClient);
