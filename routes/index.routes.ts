import express from "express";
import { indexController } from "../controller/index.controller";

const router = express.Router();

router.get("/", indexController.index);
router.post("/switch-theme", indexController.switchTheme);
router.get("/toggleTask", indexController.toggleTask);
router.post("/", indexController.orderByRedirect);

export const indexRoutes = router;