import express from "express";
import { notesController } from "../controller/notes.controller";

const router = express.Router();

router.get("/", notesController.createNote);
router.post("/", notesController.newNote);
router.get("/:id/", notesController.showNote);
router.post("/:id/", notesController.editNote);

export const noteRoutes = router;