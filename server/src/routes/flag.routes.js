import e from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

import { index, show,  create, update, destroy, search, filter, orderBy } from "../controllers/flag.controller.js";

const router = e.Router();

router.get("/", index);
router.post("/create", authMiddleware, create);
router.patch("/update/:id", authMiddleware, update);
router.delete("/destroy/:id", authMiddleware, destroy);

router.get("/search", search);
router.get("/filter", filter);
router.get("/orderby", orderBy);

router.get("/:id", show);
 
export default router;