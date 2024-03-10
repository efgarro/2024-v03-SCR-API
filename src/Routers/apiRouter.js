import Router from "express-promise-router";
import passport from "passport";
import { getUsers } from "../RouteHandlers/apiHandlers.js";

export const apiRouter = Router();

apiRouter.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  getUsers
);
