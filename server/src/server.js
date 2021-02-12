import express from "express";
import indexRoutes from "./routes/indexRoutes";
import cors from "cors";
import logger from "morgan";
import { createStream } from "rotating-file-stream";
import path from "path";
import bodyParser from "body-parser";

const app = express();

function setupServer() {
  applyExpressMiddlewares();
  //   app.use("/api/settings", settingRoutes);
  //   app.use("/api/locations", locationRoutes);
  //   app.use("/api/auth", authRoutes);
  app.get("/", (req, res) => {
    res.json("hi from gam server");
  });
  app.use(express.static(path.join(__dirname, "public")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });
}

function applyExpressMiddlewares() {
  app.use(cors());
  app.use(bodyParser.json());
  const accessLogStream = createStream("access.log", {
    interval: "10d", // rotate every 10 days
    size: "250M",
    path: path.join(__dirname, "log"),
  });
  app.use(
    logger(":remote-addr\t:method\t:url\t:status\t:response-time ms", {
      stream: accessLogStream,
    })
  );
}

/**
 * @param {number} port - Server listening port number
 */
function startServer(port) {
  app.listen(port);
  console.log(`server started on port ${port}`);
}

// Starting the server
console.log("setting the server");
setupServer();
console.log("starting the server");
startServer(5000);
