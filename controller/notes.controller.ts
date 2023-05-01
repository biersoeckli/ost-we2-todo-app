import { Request, Response } from "express";
import { noteDataAccess } from "../services/note.data-access";

export class NotesController {
  createNote = (req: Request, res: Response): void => {
    res.render("note");
  };

  newNote = async (req: Request, res: Response): Promise<void> => {
    console.log(req);

    res.render(
      "note",
      await noteDataAccess.add(
        req.body.title,
        req.body.importance,
        req.body.dueDate,
        !!req.body.finished,
        req.body.description
      )
    );
  };

  editNote = async (req: Request, res: Response): Promise<void> => {
    res.render(
      "note",
      await noteDataAccess.update(
        req.params.id,
        req.body.title,
        req.body.importance,
        req.body.dueDate,
        req.body.finished,
        req.body.description
      )
    );
  };

  showNote = async (req: Request, res: Response): Promise<void> => {
    res.render("note", await noteDataAccess.get(req.params.id));
  };
}
export const notesController = new NotesController();