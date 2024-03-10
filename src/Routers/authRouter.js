import Router from "express-promise-router";
import passport from "passport";

export const authRouter = Router();
import { issueJWT } from "../Utils/utils.js";

import {
  registerNewUser,
  findCountryAndUserRoleIds,
} from "../RouteHandlers/authHandlers.js";

authRouter.post(
  "/register/user",
  findCountryAndUserRoleIds,
  registerNewUser,
  passport.authenticate("local", { session: false }),
  (req, res) => {
    res.json({
      success: true,
      user: req.user,
      message: "authenticated via .../register",
    });
  }
);

authRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res, next) => {
    const jwtObject = issueJWT(req.user);
    res.json({
      success: true,
      user: req.user,
      token: jwtObject.token,
      expiresIn: jwtObject.expires,
      message: "authenticated via .../login",
    });
  }
);

// module.exports = authRouter;
