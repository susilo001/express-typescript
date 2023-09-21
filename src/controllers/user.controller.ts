import { Request, Response } from "express";
import { db } from "../config/db";
import { users } from "../schema/user";
import { eq } from "drizzle-orm";

const index = async (req: Request, res: Response) => {
  try {
    const Users = await db.select().from(users);
    res.status(200).json(Users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
const show = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id as unknown as number;
    const User = await db.select().from(users).where(eq(users.id, userId));
    res.status(200).json(User);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
const store = (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    db.insert(users).values({ name, email, password });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
const update = (req: Request, res: Response) => {
  try {
    const userId = req.params.id as unknown as number;
    const { name, email, password } = req.body;
    db.update(users).set({ name, email, password }).where(eq(users.id, userId));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
const destroy = (req: Request, res: Response) => {
  try {
    const userId = req.params.id as unknown as number;
    db.delete(users).where(eq(users.id, userId));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default { index, show, store, update, destroy };
