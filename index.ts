import express from "express";
import { config } from "dotenv"
import mongoose from "mongoose";
import create from "./controllers/create";
import webhook from "./controllers/webhook";

config();

const DB_URL = process.env.MONGO_DB_URL;

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.post("/create/user", create)
app.post("/webhook/shares-purchase", webhook)

const PORT = process.env.PORT ?? 5000;

Promise.all( [app.listen(PORT), mongoose.connect(DB_URL as string)] )
.then(()=> console.log("Server and Database up and running!"))
