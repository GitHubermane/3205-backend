import { Router } from "express";
import { UserController } from "./controller.js";

const router = Router();

router.get("/", UserController.getUser);

export default router;
