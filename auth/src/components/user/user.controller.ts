import express, { Router } from "express";
import currentUser from "./workspace/current.user";
import signout from "./workspace/signout";
import { signUpValidator, signUp } from "./workspace/signup";
import { signInValidator, signIn } from "./workspace/signin";
import { validateRequest, currentUserMiddleWare } from "@jvtickets22/common";

const router: Router = express.Router();

router.get("/users/currentuser", currentUserMiddleWare, currentUser);
router.post("/users/signin", signInValidator, validateRequest, signIn);
router.post("/users/signup", signUpValidator, validateRequest, signUp);
router.post("/users/signout", signout);

export default router;
