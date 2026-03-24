import express from "express";
import "./config/db/postgres";
import "./config/db/redis";
import projctRoute from "./routes/project";


const app = express();
app.use(express.json());

app.get("/health", (_, res) => res.json({ status: "ok", service: "api" }));

app.use("/api/v1/project", projctRoute);

app.listen(3001, () => console.log("API running on :3001"));