import express from "express";
import { Request, Response } from "express";
import userController from "../controllers/user.controller";

const router = express.Router();

// User routes
router.route("/users").get(userController.index).post(userController.store);
router
  .route("/users/:id")
  .get(userController.show)
  .put(userController.update)
  .delete(userController.destroy);

export default router;
