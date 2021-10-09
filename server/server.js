import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from "./routes/auth.js";
import { connectDatabase } from "./config/db.js";

dotenv.config({
    path: "./config/config.env"
});

const app = express();
connectDatabase();

app.use(bodyParser.json());

if(process.env.NODE_ENV === "development") {
    app.use(cors({
        origin: process.env.CLIENT_URL
    }));

    app.use(morgan("dev"));
}

app.use("/api", authRouter);

app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Page not found"
    })
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App is listening on PORT: ${PORT}`);
});