import { NOCHI_AUTH } from "constants/cookie";
import { getUserBySeesionToken } from "db/users";
import { NextFunction, Request, Response } from "express";
import { get, merge } from "lodash";

export const isOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id") as string;

    if (!currentUserId) {
      return res.sendStatus(403);
    }

    if (currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }

    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionToken = req.cookies[NOCHI_AUTH];

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const existingUser = await getUserBySeesionToken(sessionToken);

    if (!existingUser) {
      return res.sendStatus(403);
    }

    merge(req, { identity: existingUser });

    return next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};
