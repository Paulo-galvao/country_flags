import e from "express";
import authMiddleware from "../middlewares/authMiddleware.js"

import { index, login, signup, show } from "../controllers/user.controller.js";

const router = e.Router();

router.get("/", index);
router.post("/signup", signup);
router.post("/login", login);

router.get("/show/:id", authMiddleware, show);

export default router;