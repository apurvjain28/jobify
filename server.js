import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import helmet from "helmet";
import xss from "xss";
import mongoSanitize from "express-mongo-sanitize";

// db and authenticate user
import connectDB from "./db/connect.js";

// router
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRoutes.js";

// middleware
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";
import authenticateUser from "./middleware/auth.js";

// making connection string
// const dbURL = process.env.MONGO_URL.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// );

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// to deploy the app
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

// app.get("/", (req, res) => {
//   //throw new Error("error");
//   res.json({ msg: "Welcome!" });
// });

// app.get("/api/v1", (req, res) => {
//   //throw new Error("error");
//   res.json({ msg: "API!" });
// });

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

// deploy: direct all other get route to index.html
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(notFoundMiddleware);
// should be in bottom of all the Middleware
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

// spin up the server only when connection with db is made
const start = async () => {
  try {
    // as a promise is returned
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is running on ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
