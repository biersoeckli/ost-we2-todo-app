import { Request, Response } from "express";
import { noteDataAccess } from "../services/note.data-access";
import { Note } from "../models/note.model";
import { DateUtils } from "../utils/date.utils";

export class NotesController {
  getNote = async (req: Request, res: Response) => {
    if (req.query.id) {
      const existingNote = await noteDataAccess.get(req.query.id as string);
      res.render("note", {
        ...existingNote,
        isNew: false,
        darkTheme: req.settings.darkTheme
      });
    } else {
      res.render("note", {
        isNew: true,
        darkTheme: req.settings.darkTheme
      });
    }
  };

  saveNote = async (req: Request, res: Response): Promise<void> => {

    const note = req.query.id ? await noteDataAccess.get(req.query.id as string) : new Note();
    note.title = req.body.title;
    note.importance = +req.body.importance;
    note.dueDate = DateUtils.parseDateFromDateInput(req.body.dueDate);
    note.finished = !!req.body.finished;
    note.description = req.body.description;
    await noteDataAccess.save(note)
    res.redirect(`/`);
  };

  deleteNote = async (req: Request, res: Response): Promise<void> => {
    await noteDataAccess.deleteById(req.query.id as string)
    res.redirect(`/`);
  };

}
export const notesController = new NotesController();