import { type Request, type Response } from "express";
import { logger } from "../utils/logger.js";
import UserService from "./service.js";

export const UserController = {
  async getUser(req: Request, res: Response) {
    try {
      const { email, number } = req.query;
      const user = await UserService.getUser(email as string, number as string);
      logger.info("Response was sent");
      return res.json(user);
    } catch (error) {
      logger.error(error);
      res.status(500).json({ message: error });
    }
  },
};
