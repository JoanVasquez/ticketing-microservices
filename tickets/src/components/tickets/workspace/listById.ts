import { NextFunction, Request, Response } from "express";
import { listTicketByIdDao } from "../ticket.dao";

export const listById = (req: Request, res: Response, next: NextFunction) => {
  listTicketByIdDao(req.params.ticketId)
    .then((ticket) => {
      res.send(ticket);
    })
    .catch((error) => {
      next(error);
    });
};
