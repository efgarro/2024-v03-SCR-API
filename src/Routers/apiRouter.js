import Router from "express-promise-router";
import { getUsers } from "../RouteHandlers/apiHandlers.js";

export const apiRouter = Router();

apiRouter.get("/users", getUsers);
