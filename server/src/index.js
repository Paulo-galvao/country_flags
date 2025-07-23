import e from "express";
import cors from "cors";
import { connectTest } from "./config/connection.js";

import userRoutes from "./routes/user.routes.js";
import flagRoutes from "./routes/flag.routes.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import User from "./models/User.js";

const port = 3021;
const app = e();

app.use(e.json());
app.use(cors());

app.use("/users", userRoutes);
app.use("/flags", flagRoutes);
app.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);

    console.log(req.userId);
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

connectTest();
app.listen(port, () => console.log("Server listening on port", port));
