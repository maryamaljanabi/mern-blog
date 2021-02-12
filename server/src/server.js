import express from "express";
import mongoose from "mongoose";
import indexRoutes from "./routes/indexRoutes";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import connectDB from "./db/dbConfig";
require("dotenv").config();

const app = express();

function setupServer() {
  connectDB();
  middlewares();
  app.get("/", (req, res) => {
    res.json("hi from server");
  });
  app.use(express.static(path.join(__dirname, "public")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });
}

function middlewares() {
  app.use(cors());
  app.use(bodyParser.json());
}

function startServer(port) {
  app.listen(port);
  console.log(`server started on port ${port}`);
}

setupServer();
startServer(5000);
