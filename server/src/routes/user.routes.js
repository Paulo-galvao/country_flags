import e from "express";

import { index, login, signin } from "../controllers/user.controller.js";

const router = e.Router();

router.get("/", index);
router.post("/signin", signin);
router.post("/login", login);



export default router;