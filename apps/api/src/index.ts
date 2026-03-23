import express from "express";
const app = express();
app.use(express.json());

app.get("/health", (_, res) => res.json({ status: "ok", service: "api" }));

app.listen(3001, () => console.log("API running on :3001"));