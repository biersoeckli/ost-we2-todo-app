import { Request, Response } from "express";
import { noteDataAccess } from "../services/note.data-access";

export class IndexController {
  async index(req: Request, res: Response) {
    res.render("index", {
      data: await noteDataAccess.all(),
      dark: false,
    });
  }
}

export const indexController = new IndexController();