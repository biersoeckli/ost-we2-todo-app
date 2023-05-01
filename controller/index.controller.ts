import { Request, Response } from "express";
import { noteDataAccess } from "../services/note.data-access";
import { Note } from "../models/note.model";

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
      dark: false,
      sortProperties: [
        ['_id', 'ID'],
        ['title', 'Title'],
        ['description', 'Description'],
        ['finished', 'Finished'],
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
}

export const indexController = new IndexController();