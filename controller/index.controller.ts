import { Request, Response } from "express";
import { noteDataAccess } from "../services/note.data-access";
import { Note } from "../models/note.model";
import { Session, SessionData } from "express-session";
import { Settings } from "../utils/session-middleware.index";

export class IndexController {
  async index(req: Request, res: Response) {
    const asc = req.query.asc === 'true';
    let data = await noteDataAccess.all(req.query.orderBy as string, asc);
    if (req.query.filterCompleted === 'true') {
      data = data.filter((note) => note.finished);
    }
    if (req.query.filterCompleted === 'false') {
      data = data.filter((note) => !note.finished);
    }

    res.render("index", {
      data,
      orderBy: req.query.orderBy ?? '_id',
      asc,
      filterCompleted: req.query.filterCompleted,
      darkTheme: req.settings.darkTheme,
      sortProperties: [
        ['title', 'Title'],
        ['description', 'Description'],
        ['importance', 'Importance'],
        ['finished', 'Finished'],
        ['dueDate', 'Due Date'],
        ['createdAt', 'Created At']
      ]
    });
  }

  async orderByRedirect(req: Request, res: Response) {
    let filterQuery = '';
    if (req.query.filterCompleted !== '') {
      filterQuery = `&filterCompleted=${req.query.filterCompleted}`;
    }
    res.redirect(`/?orderBy=${req.query.orderBy}&asc=${req.query.asc}${filterQuery}`);
  }

  async switchTheme(req: Request, res: Response) {
    const session = (req.session as Session & {settings: Settings});
    session.settings.darkTheme = !session.settings.darkTheme;
    res.redirect(`/`);
  }
  
  async toggleTask(req: Request, res: Response) {
    const note = await noteDataAccess.get(req.query.noteId as string);
    note.finished = !note.finished;
    await noteDataAccess.save(note);
    res.redirect(`/`);
  }
}

export const indexController = new IndexController();