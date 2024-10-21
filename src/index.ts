import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import sampleRoute from "./routes/memberRoute";
import mongoConnection from "./config/mongodbConfig";
import { Request, Response } from "express";
import "dotenv/config";
import corsOptions from "./config/corsConfig";
import priceRoute from "./routes/adminRoute";


// connection to mongodb
mongoConnection();

const app = express();

app.use(cors(corsOptions));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/ping", (req: Request, res: Response) => {
  res.send("PONG!");
});

// api routes
app.use("/api/member", sampleRoute);
app.use("/api/admin", priceRoute);

mongoose.connection.once("open", () => {
  app.listen(3000,'0.0.0.0', () => {
    console.log("Server runnint on port 3000");
  });
});
