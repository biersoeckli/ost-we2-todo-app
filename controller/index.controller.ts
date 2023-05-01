import { Request, Response } from "express";
import { noteDataAccess } from "../services/note.data-access";

export class IndexController {
  async index(req: Request, res: Response) {
    const asc = req.query.asc === 'true';
    const filterCompleted = req.query.filterCompleted === 'true';
    let data = await noteDataAccess.all(req.query.orderBy as string, req.query.asc === 'true');
    if (req.query.filterCompleted === 'true') {
      data = data.filter((note) => note.finished);
    }
    if (req.query.filterCompleted === 'false') {
      data = data.filter((note) => !note.finished);
    }
    res.render("index", {
      data,
      orderBy: req.query.orderBy ?? '_id',
      asc: asc,
      filterCompleted: filterCompleted,
      dark: false,
    });
  }

  async orderByRedirect(req: Request, res: Response) {
    let direction = false;
    if (req.query.asc) {
      direction = req.query.asc === 'true';
    }
    if (req.query.filterCompleted) {
      res.redirect(`/?orderBy=${req.query.orderBy}&asc=${direction}&filterCompleted=${req.query.filterCompleted}`);
      return;
    }
    res.redirect(`/?orderBy=${req.query.orderBy}&asc=${direction}`);
  }
}

export const indexController = new IndexController();