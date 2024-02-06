require("dotenv").config();
import express, { Request, Response } from "express";
import config from "config";
import morgan from "morgan";
import eventsRouter from "./routes/eventRoutes";
import authRoutes from "./routes/authRoutes";
import passport from './utils/passport'

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(passport.initialize());

const port = config.get("port");
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello");
});

// ROUTES
app.use("/api/v1/events", eventsRouter);
app.use('/auth', authRoutes)

app.listen(port, () => {
  console.log(`Server listening to port ${port}`);
});
