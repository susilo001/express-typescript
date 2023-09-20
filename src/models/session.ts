import { db } from "../config/db";
import { eq } from "drizzle-orm";
import { sessions } from "../schema/session";
import { User } from "./user";

const create = async (User: User) => {
  try {
    return await db
      .insert(sessions)
      .values({
        user_id: User.id,
        token:
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15),
        expires_at: new Date(Date.now() + 3600000).toISOString(),
      })
      .returning({ id: sessions.id, token: sessions.token });
  } catch (error) {
    throw new Error(`Unable to create session: ${error}`);
  }
};

const find = async (query: any) => {
  try {
    return await db
      .select()
      .from(sessions)
      .where(eq(sessions.token, query.token));
  } catch (error) {
    throw new Error(`Unable to find session: ${error}`);
  }
};

const destroy = async (query: any) => {
  try {
    return await db.delete(sessions).where(eq(sessions.token, query.token));
  } catch (error) {
    throw new Error(`Unable to destroy session: ${error}`);
  }
};

export default { create, find, destroy };
