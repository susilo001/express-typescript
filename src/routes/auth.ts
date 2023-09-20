import express from "express";
import { Request, Response } from "express";
import passport from "../config/passport";

const router = express.Router();

router.get("/login", (req: Request, res: Response) => {
  res.send('<a href="/auth/google">Login using Google</a>');
});

router.get("/logout", (req: Request, res: Response, next) => {
  req.logout((err) => next(err));
  req.session.destroy((err) => next(err));

  res.redirect("/");
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/profile",
  })
);

export default router;
