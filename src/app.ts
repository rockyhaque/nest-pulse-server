import express, { NextFunction, Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { StatusCodes } from "http-status-codes";
import notFoundHandler from "./app/middlewares/notFoundHandler";

const app: Application = express();
app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "NestPulse Server...",
  });
});

// app.use("/api/v1/user", userRoutes);
// app.use("/api/v1/admin", adminRoutes);

app.use("/api/v1", router);

// Global Error Handler
app.use(globalErrorHandler);

// Not Found
app.use(notFoundHandler)

export default app;
