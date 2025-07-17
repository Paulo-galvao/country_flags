import e from "express";
import { connectTest } from "./config/connection.js";

import userRoutes from './routes/user.routes.js';
import flagRoutes from './routes/flag.routes.js';

const port = 3021;
const app = e();

app.use(e.json());

app.use('/users', userRoutes);
app.use('/flags', flagRoutes);

connectTest();
app.listen( port, () => console.log("Server listening on port", port));