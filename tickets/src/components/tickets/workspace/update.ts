import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { updateTicketDao } from "../ticket.dao";

export const updateValidator = [
  body("title").not().isEmpty().withMessage("Title is required"),
  body("price").isFloat({ gt: 0 }).withMessage("Price must be greater than 0"),
];

export const update = (req: Request, res: Response, next: NextFunction) => {
  updateTicketDao(req.body, req.currentUser!.id)
    .then((ticket) => {
      res.send(ticket);
    })
    .catch((err) => next(err));
};
