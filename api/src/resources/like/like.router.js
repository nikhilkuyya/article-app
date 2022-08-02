import { Router } from "express";
import { createStatus, getStatus, updateStatus } from "./like.controller";
const router = Router();

router.route("/").get(getStatus).post(createStatus);

router.route("/:id").put(updateStatus);

export default router;
