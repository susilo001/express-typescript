import express from "express";
import { Request, Response } from "express";

const router = express.Router();

const isLoggedIn = (req: Request, res: Response, next: any) => {
  req.user ? next() : res.sendStatus(401);
};

router.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

router.get("/profile", isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user}`);
});

export default router;
