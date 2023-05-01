import express from "express";
import { notesController } from "../controller/notes.controller";

const router = express.Router();

router.get("/", notesController.getNote);
router.post("/", notesController.saveNote);
router.post("/delete", notesController.deleteNote);

export const noteRoutes = router;