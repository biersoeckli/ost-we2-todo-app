import { NextFunction, Request, Response } from "express";

export const sessionUserSettings = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userSettings = req.session?.settings || {
    darkTheme: false,
  };

  req.settings = req.session.settings = userSettings;
  next();
};

export interface Settings {
  darkTheme: boolean;
}