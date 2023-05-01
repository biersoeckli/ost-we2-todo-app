import { NextFunction, Request, Response } from "express";

export const sessionUserSettings = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userSettings = req.session?.settings || {
    orderBy: "title",
    orderDirection: -1,
    //style: Style.Light,
  };
  const { orderBy, orderDirection } = req.query;

  if (orderBy) {
    userSettings.orderBy = orderBy.toString();
  }
  if (orderDirection) {
    userSettings.orderDirection = parseInt(orderDirection.toString());
  }

  req.settings = req.session.settings = userSettings;
  return;
};

export interface Settings {
  orderBy: string;
  orderDirection: number;
}