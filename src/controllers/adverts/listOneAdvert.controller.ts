import { Request, Response } from "express";

export const listOneAdvertsController = (req: Request, res: Response) => {
  return res.json("Rota GET/:id adverts criada");
};
