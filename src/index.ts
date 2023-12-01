import express from "express";
import { morganMiddleware } from "./middleware/morgan.js";
import router from "./routes.js";
import { logger } from "./utils/logger.js";

const app = express();
const PORT = process.env.PORT ?? 5100;

app.use(morganMiddleware);
app.use("/api", router);

const start = async () => {
  try {
    app.listen(PORT, () => {
      logger.info(`Server has been started on port ${PORT}`);
    });
  } catch (e) {
    logger.error(e);
  }
};

start();