import express, { Application, Request, Response } from "express";
import "express-async-errors";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import {
  NotFoundError,
  errorHandler,
  currentUserMiddleWare,
} from "@jvtickets22/common";
import ticketController from "./components/tickets/ticket.controller";

const app: Application = express();
app.set("trust proxy", true);
app.use(bodyParser.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUserMiddleWare);

app.use("/api", ticketController);
app.get("*", async (req: Request, res: Response) => {
  throw new NotFoundError();
});
app.use(errorHandler);

export default app;
