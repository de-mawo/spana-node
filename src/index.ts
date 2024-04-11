require("dotenv").config(); // Add this otherwise .env variables wont read
import express from "express";
import session from "express-session";
import morgan from "morgan";
import cors from "cors";
import passport from "./utils/passport";
import redisStore from "./utils/redis";
import { __prod__, COOKIE_NAME } from "./utils/constants";
// Import Routes
import authRoutes from "./routes/auth";
import userRouter from "./routes/user";
import leaveRouter from "./routes/leave";
import balanceRouter from "./routes/balance";
import eventsRouter from "./routes/event";

const app = express();
const port = process.env.PORT;

// MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true,
  })
);

// Initialize session storage.
app.use(
  session({
    name: COOKIE_NAME,
    store: redisStore,
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: false, // recommended: only save session when data exists
    secret: process.env.SESSION_SECRET as string,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30, //30 Days
      httpOnly: true,
      sameSite: "lax", //csrf
      secure: __prod__,
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize()); // init passport on every route call.
app.use(passport.session()); // allow passport to use "express-session".

// app.use("*", (req, res, next) => {
//   console.log(req.headers);
//   next()
  
// })

// ROUTES
app.use("/auth", authRoutes);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/leave", leaveRouter);
app.use("/api/v1/balance", balanceRouter);
app.use("/api/v1/events", eventsRouter);

app.listen(port, () => {
  console.log(`Server listening to port ${port}`);
});
