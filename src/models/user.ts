import { users } from "../schema/user";
import { db } from "../config/db";
import { eq } from "drizzle-orm";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar: string;
}

const findOrCreate = async (query: any) => {
  try {
    // Check if a user with the specified query exists

    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, query.email));

    // If a user exists, return the user
    if (user) {
      return user;
    } else {
      // If a user does not exist, create a new user
      return await db
        .insert(users)
        .values({
          name: query.name,
          email: query.email,
          password: query.password,
          avatar: query.avatar,
        })
        .returning({ id: users.id, name: users.name, email: users.email });
    }
  } catch (error) {
    throw new Error(`Unable to find or create user: ${error}`);
  }
};

const create = async (user: User) => {
  try {
    return await db
      .insert(users)
      .values(user)
      .returning({ id: users.id, name: users.name, email: users.email });
  } catch (error) {
    throw new Error(`Unable to create user: ${error}`);
  }
};

const findAll = async () => {
  try {
    return await db.select().from(users);
  } catch (error) {
    throw new Error(`Unable to find users: ${error}`);
  }
};

const findById = async (id: number) => {
  try {
    return await db.select().from(users).where(eq(users.id, id));
  } catch (error) {
    throw new Error(`Unable to find user: ${error}`);
  }
};

const update = async (id: number, user: User) => {
  try {
    return await db
      .update(users)
      .set({
        name: user.name,
        email: user.email,
      })
      .where(eq(users.id, id))
      .returning({ id: users.id, name: users.name, email: users.email });
  } catch (error) {
    throw new Error(`Unable to update user: ${error}`);
  }
};

const destroy = async (id: number) => {
  try {
    await db.delete(users).where(eq(users.id, id));
  } catch (error) {
    throw new Error(`Unable to delete user: ${error}`);
  }
};

export default { findOrCreate, create, findAll, findById, update, destroy };
