import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { createTicketDao } from "../ticket.dao";

export const createValidator = [
  /*body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be between 4 and 20 characters"),*/
];

export const create = (req: Request, res: Response, next: NextFunction) => {
  res.status(201).send("Hello there");
  /*signUpDao(req.body)
    .then((user) => {
      const userJwt = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_KEY!
      );
      req.session = {
        jwt: userJwt,
      };
      res.status(201).send(user);
    })
    .catch((error) => {
      next(error);
    });*/
};
