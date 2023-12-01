import express from "express";
import expressWinston from "express-winston";
import { format, transports } from "winston";

const app = express();
const PORT = process.env.PORT ?? 5100;

app.use(
  expressWinston.logger({
    transports: [new transports.Console()],
    format: format.combine(
      format.json(),
      format.timestamp(),
      format.prettyPrint(),
    ),
  }),
);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
