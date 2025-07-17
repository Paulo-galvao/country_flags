import e from "express";

import { index, show,  create, update, destroy } from "../controllers/flag.controller.js";

const router = e.Router();

router.get("/", index);
router.post("/create", create);
router.patch("/update/:id", update);
router.delete("/destroy/:id", destroy);

router.get("/:id", show);

export default router;