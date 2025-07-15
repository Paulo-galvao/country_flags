import e from "express";
import { connectTest } from "./config/connection.js";

const port = 3021;
const app = e();

app.use(e.json());

connectTest();
app.listen( port, () => console.log("Server listening on port", port));