import {
  serial,
  text,
  pgTable,
  integer,
  AnyPgColumn,
} from "drizzle-orm/pg-core";
import { users } from "./user";

export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references((): AnyPgColumn => users.id),
  token: text("token"),
  expires_at: text("expires_at"),
});
